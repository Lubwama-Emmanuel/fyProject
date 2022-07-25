const express = require('express')
const logger = require('morgan')
const app = express()
const userRoute = require('./routers/userRoute')

app.use(logger('dev'))
app.use(express.json())

app.use('/api/v1/users', userRoute)
app.all('*', (req, res) => {
  console.log(`Route ${req.originalUrl} is not defined`)
})

module.exports = app
