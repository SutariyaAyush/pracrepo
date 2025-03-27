const express = require('express')

const app = express()

const server = require('http').createServer(app)



const io= require('socket.io')(server,{
    cors:{
        origin:"*",
       
    }
})

io.on("connection",(socket)=>{
    console.log("socket is active");
    console.log("what is scoket",socket);

    socket.on("chat",(payload)=>{ //anything inplace of chat
        console.log("what is payload",payload);
        io.emit("chat",payload)
    })

})

server.listen(5000,()=>{
    console.log("server is listing on 5000..");
})
