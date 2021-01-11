const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const Schema = mongoose.Schema;

const AddressSchema = new mongoose.Schema({

    Addresstxt:{
        type:String
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
    },
});
//geocoder  & create location
AddressSchema.pre('save',async function (next) {
    const loc = await geocoder.geocode(this.Addresstxt);
    this.Location = {
        type: 'Point',
        coordinates: [loc[0].latitude, loc[0].longitude],
        formattedAddress: loc[0].formattedAddress
    }
    this.Address = undefined;
    next();
});
module.exports = mongoose.model("Address", AddressSchema);