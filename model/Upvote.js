var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UpvoteSchema = new mongoose.Schema({
    
    userupvote: {
      type: String,
      
    },
    postid:{
      type:String,
      
    },
    
    
});

module.exports = mongoose.model("Upvote", UpvoteSchema);
