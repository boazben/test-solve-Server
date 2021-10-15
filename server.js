require('dotenv').config()
const express = require('express');
const cors = require('cors')
const { connect } = require('./db');
const Router = require('./router');
const server = express()

server.use(express.static('public'))
server.use('*', express.static('public')) // TODO- cheack if it's hear
server.use(express.json())
server.use(cors())

 
console.log('Connecting...');
connect().
    then(() => {
        Router(server)
        server.listen(process.env.PORT, () => {console.log(`Server Is Runing In Port ${process.env.PORT}!`);})
    })
 