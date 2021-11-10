const express = require('express');
const bodyParser = require('body-parser');
const { Socket } = require('socket.io');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://user:1234@chatapp.qabde.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const port = Process.env.PORT || 3000;

// require('./database')


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

let Message = mongoose.model('Message' , {
    name : String,
    message : String
});



let messages = [];

app.get('/messages' , (req, res)=>{
    Message.find({} , (err, messages) => {
        res.send(messages)
    })

});

app.post('/messages' , (req, res)=>{
    let message = new Message(req.body);
    message.save((err)=>{
        if(err){
            sendStatus(500);
        }
        io.emit('message' , req.body);
        res.sendStatus(200);
    })
});


io.on('connection' , (socket)=>{
    console.log('user connected');
});

mongoose.connect(dbURL, (err)=>{
    console.log('connection mongoDB' , err)
});

const server = http.listen(port, ()=>{
    console.log(`The server is running ${server.address().port}`);
});
