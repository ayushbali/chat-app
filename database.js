const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://user:1234@chatapp.qabde.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

let Message = mongoose.model('Message' , {
    name : String,
    message : String
});


mongoose.connect(dbURL, (err)=>{
    console.log('connection mongoDB' , err)
});