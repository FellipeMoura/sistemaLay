const express = require('express')
const http = require('http')
const Socket = require('socket.io')

const server = express()

exports.serverHttp = http.createServer(server),

exports.io = new Socket(serverHttp)


