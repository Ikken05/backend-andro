const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver:{
        type: String,
    },
    
    action: {
        type: String,
        required: true
    },

    profileimage: {
        type: String,
    },

    date: {
        type: String,
        default: Date.now
    },

});


module.exports = mongoose.model('Notification', notificationSchema);