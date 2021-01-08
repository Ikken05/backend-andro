const router = require('express').Router();
const Material = require('../model/Material');
const { schema } = require('../model/Material');
const User = require('../model/User');



router.post('/addMaterial', async (req,res)=>{
    
    const owner = await User.findOne({username: req.body.username});
    const material = new Material ({
        
        Type: req.body.type,
        Owner: req.body.owner,
        

        
        
    }); try{
        const savedMaterial = await material.save();
        res.json({material: material._id});
        console.log(req.body.type)
    }catch(err){
        res.status(400).send(err);
        console.log(err)
    }

});

module.exports = router;