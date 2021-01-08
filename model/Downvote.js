var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DownvoteSchema = new mongoose.Schema({
    
    userdownvote: {
      type: String,
      
    },
    postid:{
      type:String,
      
    },
    
    
});

module.exports = mongoose.model("Downvote", DownvoteSchema);
