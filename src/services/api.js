const axios = require('axios')

const generateData = () =>
  axios.get(`${process.env.API_URL}/generate-data?token=${process.env.TOKEN}`)

const submitSolution = file => {
  const data = new FormData()
  data.set('answer', file)

  axios.post(`${process.env.API_URL}/submit-solution?token=${process.env.TOKEN}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

module.exports = { generateData, submitSolution }
