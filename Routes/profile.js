const router = require('express').Router();
const multer = require('multer');
const User = require('../model/User');
const { schema } = require('../model/User');
//const upload = multer({dest: './uploads'});

// Set Multer Storage Engine
const storageProfileImages = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
  }
});
const storageResume = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

// Init multer upload
const uploadProfileImage = multer({
  storage: storageProfileImages
}).single('profilepicture');
const uploadResume = multer({
  storage: storageResume
}).single('resume');

router.post("/updateuser", async (req, res) => {


  const user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profileimage: req.body.profileimage,
    phone: req.body.phone,
    
  })
  try {


    //console.log("This is your file" + req.file);
    const updateUser = await User.updateOne({ username: user.username },
      {
        $set: {
          fullname: user.fullname,
          email: user.email,
          password: user.password,
          profileimage: user.profileimage,
          phone: user.phone,
        }
      });
    res.json( user)
    console.log({updateUser})
  } catch (err) {
    res.json({ message: err });
  }


});
/*router.post("/uploadresume/:username", async (req, res) => {

  const user = new User({
    resume: req.body.resume,  
  })
  try {


    console.log("This is your file" + req.file);
    const updateUser = await User.updateOne({ username: req.params.username },
      {
        $set: {
          resume: user.resume,
        }
      });
    res.json(user)
    console.log({updateUser})
  } catch (err) {
    res.json({ message: err });
  }


});
*/
// add it to the mongoDB
router.post('/uploadpic', async(req,res) => {
  //receiving the uploaded pic from frontend and converting the image to text!  
  uploadProfileImage(req, res, async(err) => {
      if(err) {
          res.send(err);
      } else {
          let dest =  req.file.filename;
          try{
              console.log("Image Uploaded") // or res.send("updated!")
              res.send(req.file.filename);
          }catch(err){
              res.json({ message : err });
          }
          console.log(req.file);
      }
  })    
});



//show username, profileimage and role for the posts
//url : /profile/oneuser
router.get('/oneuser', async (req, res) => {
  try {
    const userinfo = await User.findOne({ username: req.body.user });
    res.json(userinfo.profileimage, userinfo.username, userinfo.role );
  } catch (err) {
    res.json({ message: err });
  }

});


//profiling:
router.get('/info', async (req, res) => {

  try {
    const userinfo = await User.findOne({ username: req.body.username });
    res.json({
      profileimage: userinfo.profileimage,
      fullname: userinfo.fullname,
      username: userinfo.username,
      role: userinfo.role,
      email: userinfo.email,
      phone: userinfo.phone,
    });
  } catch (err) {
    res.json({ message: err });
  }

});


router.delete('/deleteaccount', async (req, res) => {

  try {
    const user = await User.findOneAndDelete({ username: req.body.username });
    res.json({status:true, message:"account deleted"});
  } catch (err) {
    res.json({ message: err });
  }

});



module.exports = router;

