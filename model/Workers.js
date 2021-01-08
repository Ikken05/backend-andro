const mongoose = require('mongoose');


const WorkersSchema = new mongoose.Schema({
    
    Fullname:{
        type:String,
        required: true
    },
    Role:{
        type:String,
        required:true
    },
    Employer:{
        type:String,
        required:true
    }

});




module.exports = mongoose.model('Workers',WorkersSchema);