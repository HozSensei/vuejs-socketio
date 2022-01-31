const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// ajout de socket.io
const options = {
        cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
}
const server = require('http').Server(app)
const io = require('socket.io')(server, options)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function (req, res) {
    res.status(200).json({'data': 'HelloWorld'})
})

// établissement de la connexion
io.on('connection', (socket) =>{

    // Log id Socket sur le serveur
    console.log(`Connecté au client ${socket.id}`)

    // Catch un nouveau message est envoyé dans le chat
    socket.on('SEND_MESSAGE', function(data) {
        console.log(data);
        io.emit('MESSAGE', data)
    });
})

// on change app par server
server.listen(3000, function () {
 console.log('Votre app est disponible sur localhost:3000 !')
})