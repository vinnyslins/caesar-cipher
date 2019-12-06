require('dotenv').config()

const crypto = require('crypto')
const fs = require('fs')
const { promisify } = require('util')

const { generateData, submitSolution } = require('./services/api')

const writeFile = promisify(fs.writeFile)

const abecedary = 'abcdefghijklmnopqrstuvwxyz'.split('')

const decipher = (text, shift) => text.toLowerCase().split('').map(character => {
    if (!abecedary.includes(character)) return character

    const index = abecedary.indexOf(character) - shift
    return index >= 0
      ? abecedary[index]
      : abecedary[index + 26]
  }).join('')


const main = async () => {
  try {
    if (!process.env.TOKEN) return console.error('Token not provided')

    const { data } = await generateData()
    await writeFile('answer.json', JSON.stringify(data))

    data.decifrado = decipher(data.cifrado, data.numero_casas)
    data.resumo_criptografico = crypto
      .createHash('sha1')
      .update(data.decifrado)
      .digest('hex')

    await writeFile('answer.json', JSON.stringify(data))

    const file = fs.createReadStream('answer.json')
    const response = await submitSolution(file)

    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

main()
