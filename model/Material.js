const mongoose = require('mongoose');


const MaterialSchema = new mongoose.Schema({
    
    Type:{
        type:String,
        required: true
    },
    Owner:{
        type:String,
        required:true
    }
});




module.exports = mongoose.model('Material',MaterialSchema);