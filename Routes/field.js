const router = require('express').Router();
const mongoose = require('mongoose');
const Field = require('../model/Field');
const { schema } = require('../model/Field');
const User = require('../model/User');
const Address = require('../model/Address');




router.post('/addfield', async (req,res)=>{

    //const foundcreator = await User.findOne({username: req.params.creator});
    const field = new Field ({
        
        dimensions : req.body.dimensions,
        
        //typefield
        ReadyTime : req.body.ReadyTime,
        TypeName: req.body.TypeName,
        
        
        
        Material : req.body.Material,
        Worker : req.body.Worker,
        
        Creator: req.body.Creator,

       Address: req.body.Address
        
        
    }); 

    //res.send(JSON.stringify(field));
    
    try{
        const savedField = await field.save();   
        res.json({savedField , status : true , message:"Field successfully created!"});
        console.log(savedField);
    }catch(err){
        res.status(400).send(err);
        console.log(err)
    }



});

router.post('/generateaddress/:Addresstxt',async(req,res)=>{
    const address = new Address ({
        Addresstxt: req.params.Addresstxt
    });
    try {
        const savedaddress = await address.save();
        res.json(savedaddress);
        console.log(savedaddress);
    } catch (error) {
        
    }

});


router.get('/showuserfields/:creator',async (req,res)=>{
    try{
        const foundField = await Field.find({creator:req.body.creator});
        res.json(foundField);
        console.log({foundField});
    }catch(error){
        res.json({message:error});
    }


});



router.get('/showtypefield', async (req,res)=>{
    try{
        const foundField = await Field.findById(req.body.id);
        res.json({TypeName:foundField.TypeName,ReadyTime:foundField.ReadyTime});
        console.log({TypeName: foundField.TypeName,ReadyTime:foundField.ReadyTime});
    }catch(error){
        res.json({message:error});
    }

});


router.get('/showworker', async (req,res)=>{
    try{
        const foundWorker = await Field.findById(req.body.id);
        res.json({Fullname:foundWorker.Fullname,Role:foundWorker.Role});
        console.log({Fullname:foundWorker.Fullname,Role:foundWorker.Role});
    }catch(error){
        res.json({message:error});
    }

});


router.get('/showmaterial', async (req,res)=>{
    try{
        const foundMaterial = await Field.findById(req.body.id);
        res.json({Type:foundMaterial.Type});
        console.log({Type:foundMaterial.Type});
    }catch(error){
        res.json({message:error});
    }

});


router.get('/count',async (req,res)=>{
    try{
        const fieldnumber = await Field.count({creator:req.body.username});
        res.json({fieldnumber});
        console.log({fieldnumber});
    }catch(error){
        res.json({message:error});
    }
});

router.post('/deletefield/:id', async (req,res)=>{
  
    try{
      const deletedfield = await Field.findByIdAndRemove(req.params.id); 
      res.json({deletedfield});
    }catch(err){
  
    }
  });



module.exports = router;