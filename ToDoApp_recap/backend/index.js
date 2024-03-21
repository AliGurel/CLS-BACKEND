'use strict'

require('express-async-errors')
require('dotenv').config()
const express = require('express')
const { mongooseConnection } = require('./startup/mongooseConnection')
const { todoRouter } = require('./routes/todo.route')


const PORT = process.env?.PORT || 8000
const cors = require("cors") // fe ile ilgili

const app = express()

// fe ile ilgili
app.use(
    cors({
    origin:"http://localhost:3000"
}))
app.use(express.json())


app.use(todoRouter) 
app.use(require('./middlewares/errorHandler'))
mongooseConnection()
app.listen(PORT, ()=> console.log('Listening httpt://127.0.0.1:'+PORT)) 