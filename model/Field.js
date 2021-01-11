const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const Schema = mongoose.Schema;



const FieldSchema = new mongoose.Schema({
    
    dimensions:{
        type:Number,
        required: true
    },
    
    ReadyTime:{
        type:Number,
    },
    TypeName:{
        type:String,
    },
    Worker:[{Fullname:{
        type:String,
    },
    Role:{
        type:String,
    }}],
    
    Material:[{
        Type:{
            type:String,
    }}],
    Creator:{
        type: String,
    },
    Date:{
        type: Date,
        default:Date.now
    },
    Address:{
        type:String,
    },
    Location:{
        type: {
            type: String, 
            enum: ['Point'], 
          },
          coordinates: {
            type: [Number],
            index : '2dsphere'
          },
        formattedAddress : String 
    


}});
//geocoder  & create location
FieldSchema.pre('save',async function (next) {
    const loc = await geocoder.geocode(this.Address);
    this.Location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    this.Address = undefined;
    next();
});


module.exports = mongoose.model("Field", FieldSchema);