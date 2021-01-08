const router = require('express').Router();
const User = require('../model/User');
const Job = require('../model/Job');
const { schema } = require('../model/Job');




router.post('/hireengineer',async(req,res)=>{

    
    const job = new Job({
        employer : req.body.employer,
        employee : req.body.employee
    });

    

    try {

        const employeeExist = await Job.findOne({employee: req.body.employee,employer: req.body.employer});
        if(employeeExist) return res.status(400).send('Employee already Hired');
        const savedJob = await job.save();
        res.json({savedJob, status:true,message:"Your hire request was sent successfully"});
        console.log(savedJob);

            
    }catch (error) {
            
        }
});

router.post('/StateEngineer/:id',async(req,res)=>{

    try {

        const jobStatus = await Job.updateOne({_id:req.params.id},{$set: {
            state: true
          }});
        res.json({state:jobStatus.state,message:"you accepted the job"});
        console.log(savedJob);

            
    }catch (error) {
            
        }
});


router.get('/hiredemployees/:employer',async (req,res)=>{

        
    try{
        const hiredemployees = await Job.find({employer:req.params.employer});
        res.json(hiredemployees);
        console.log(hiredemployees);
    }catch(error){
        res.json({message:error});
    }
});

router.get('/Pendingjobs/:employee',async (req,res)=>{

        
    try{
        const  offers = await Job.find({employee:req.params.employee,state:false});
        res.json(offers);
        console.log(offers);
    }catch(error){
        res.json({message:error});
    }
});
/*router.get('/Pending/:employer',async (req,res)=>{

        
    try{
        const hiredemployees = await Job.find({employer:req.params.employer,state:false});
        const employeepending = await User.findMany({username:hiredemployees.employee});
        res.json({hiredemployees,employeepending});
        console.log(hiredemployees);
    }catch(error){
        res.json({message:error});
    }
});*/

router.post('/firedemployee', async(req,res)=>{

    try{
        const firedemployees = await Job.findByIdAndDelete({_id:req.body.id});
        res.json({status : true , message :" Engineer Fired!"});
        console.log({status : true , message :" Engineer Fired!"});
    }catch(error){
        res.json({message:error});
    }

});

router.get('/showallengineers/:role', async (req,res)=>{

try{
        const Engineers = await User.find({role:req.params.role});
        res.json(Engineers);
        console.log({Engineers,status : true , message :" These are our engineers!"});
    }catch(error){
        res.json({message:error});
    }

});

router.get('/alldetails/:username',async(req,res)=>{

    try {
        const Engineer = await User.findOne({username:req.params.username});
        res.json(Engineer);
        
    } catch (error) {
        res.json({message:error});
    }
})




module.exports = router;