const { boolean } = require('@hapi/joi');
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var JobSchema = new mongoose.Schema({
    
    employer: {
      type: String,
      
    },
    employee:{
      type:String,
      
    },
    state:{
      type:Boolean,
      default:false
    }
    
    
});

module.exports = mongoose.model("Job", JobSchema);