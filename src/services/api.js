const axios = require('axios')
const FormData = require('form-data')

const generateData = () =>
  axios.get(`${process.env.API_URL}/generate-data?token=${process.env.TOKEN}`)

const submitSolution = file => {
  const form = new FormData()
  form.append('answer', file)

  return axios.post(`${process.env.API_URL}/submit-solution?token=${process.env.TOKEN}`, form, {
    headers: form.getHeaders()
  })
}

module.exports = { generateData, submitSolution }
