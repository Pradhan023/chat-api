const express = require("express")

const app = express();

const socket = require("socket.io")  

const Port = 4000;

const Route = require("./Route")

app.use(Route)

const server = app.listen(Port,()=>{
    try{
        console.log("Server is running on Port 4000");
    }
    catch(err){
        console.log("Catch Error"+err);
    }
})

const io=socket(server,{   // it is first parameter of socket server indedcates with whom u want to get continous connection 
    cors:{                         // cors is a second paramerter of socket which is middleware which will let our server in any origin .
        origin:"*"
    }
})

io.on('connection',(socketClient)=>{  // after we connect our click with socket then our server socket will live and and this .id will give use id of live client
    console.log(socketClient.id);
    socketClient.on('Message',(msgdata)=>{     //reading the data which is coming from client by using .on method and 'Message' is the event or keyword which is use in client side for emitting the message should be use same as it is there
        console.log(msgdata)
        socketClient.emit('Msg',msgdata)  // now sending the same data from server to client using .emit method
    });

    socketClient.on('Broadcast',(bdata)=>{
        io.emit('bcast',bdata)
    });

    socketClient.on('ExclusiveBroadcast',(exbdata)=>{
        socketClient.broadcast.emit('exbcast',exbdata)   //.broadcast is the predefined keyword for exclusive broadcast
    });

    socketClient.on('joinroom',(joinedroom)=>{
        socketClient.join(joinedroom);
        io.to(joinedroom).emit('JoinSuccessfully','Client joined room successfully')

        socketClient.on('groupMess',(joinedmess)=>{
            io.to(joinedroom).emit('joinmess',joinedmess)     //to method indcated which room ...
        })
    });
})