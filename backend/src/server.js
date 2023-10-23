require('dotenv').config({path:'.env'})
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')
const routes2 = require('./routes2')

const server = express()

server.use(bodyParser.json())
server.use(cors())
server.use(bodyParser.urlencoded({extended: false}))
server.use('/lay', routes)
server.use('/agenda', routes2)

server.listen('3333', ()=> {
    console.log(`Servidor rodando em: blutecno_bueno, porta:${process.env.PORT1}`)
})





