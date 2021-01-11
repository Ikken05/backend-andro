const express = require('express');
const { countDocuments } = require('../model/Notification');
const notifications = express.Router(); 
const Notification = require('../model/Notification');
const router = require('./post');

router.get('/getallnotifications/:username', async(req,res) => {
    try{
        const allNotifications = await Notification.find({receiver: req.params.username});
        res.json(allNotifications);
    }catch(err){
        res.status(400).json({ message : err });
    }
});


router.post('/addnotification', async (req,res) =>{
    const notification = new Notification({
        sender: req.body.sender,
        receiver:req.body.receiver,
        action: req.body.action,
        profileimage: req.body.profileimage,

    });

    try{
        const addednotification = await notification.save();
        res.json(addednotification);
        console.log(addednotification);
    }catch(err){
        res.status(400).json({ message: err });
    }
});

module.exports = router;