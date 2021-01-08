var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    
    question: {
      type: String,
      minlength: 10,
      maxlength: 1000,
      required: true
    },

    user: { 
        type: String,  
        required: true
      },

    topic:{
      type:String,
      required: true
    },

    date: {
      type: Date,
      default: Date.now
    },
    
});


module.exports = mongoose.model("Post", PostSchema);