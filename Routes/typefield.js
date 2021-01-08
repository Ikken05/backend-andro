const router = require('express').Router();
const TypeField = require('../model/TypeField');
const { schema } = require('../model/TypeField');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
      callBack(null, file.originalname)
    }
  })
  const upload = multer({ storage: storage })

router.post('/addtypefield',upload.single('TypeFieldImage'), async (req,res)=>{
    const typefield = new TypeField ({
        TypeName: req.body.typename,
        ReadyTime: req.body.readytime,
        TypeFieldImage:req.file.path
        
    }); try{
        const savedTypeField = await typefield.save();
        res.json({typefield: typefield._id});
        console.log(req.body.TypeName)
    }catch(err){
        res.status(400).send(err);
        console.log(err)
    }

});

module.exports = router ;