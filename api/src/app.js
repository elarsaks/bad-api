const express = require('express')
const router = require('./router/router.js')

const PORT = process.env.PORT || 3001
const app = express()
app.use(router)

app.listen(PORT, function () {
  console.log('Redis client api listening on port:', PORT)
})
