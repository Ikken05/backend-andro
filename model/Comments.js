var mongoose = require('mongoose');


var CommentSchema = new mongoose.Schema({
    
    usercomment: {
      type: String,
    },
    body: {
      type: String,
      required : true
    },
    postid:{
      type: String,
      required: true
    }
    
});

module.exports = mongoose.model("Comment", CommentSchema);
