const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('apa')
})

app.get('/i', (req, res) => {
  res.send('apa ajaaa  haahahahahahhaah hmmm enak juga yaa')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})