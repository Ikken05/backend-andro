const router = require('express').Router();
const Workers = require('../model/Workers');
const { schema } = require('../model/Workers');
const User = require('../model/User');



router.post('/addworker', async (req,res)=>{
    
    const foundemployer = await User.findOne({username: req.body.username});
    const worker = new Workers ({
        
        Fullname: req.body.fullname,
        Role: req.body.role,
        Employer: foundemployer,

        
        
    }); try{
        const savedWorker = await worker.save();
        res.json({worker: worker._id});
        console.log(req.body.fullname)
    }catch(err){
        res.status(400).send(err);
        console.log(err)
    }

});

module.exports = router ;