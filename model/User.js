const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    
    fullname:{
        type: String,
        required : true
    },
    username:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
    role:{
        type: String,
        required: true
    },
    profileimage:{
        type: String,
        default: '/uploads/sponge_homer.jpg'
    },
    phone :{
        type:Number
    },
    
});

module.exports = mongoose.model("User", UserSchema); 


