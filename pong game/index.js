const server = require('http').createServer()
const io= require('socket.io')(server)
const PORT = 3000

server.listen(PORT)
console.log(`Listing on Port ${PORT}`);


io.on('connection',(socket) => {
    console.log('a user connected');
})