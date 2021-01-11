const router = require('express').Router();
const Post  = require('../model/Post');
const Comment = require('../model/Comments');
const Upvote = require('../model/Upvote');
const Downvote = require('../model/Downvote');



router.post('/addpost', async (req, res) =>{
    
    const post = new Post({ 
    question: req.body.question,
    user: req.body.user,
    topic: req.body.topic,
    profileimage: req.body.profileimage
  });
    const savedPost = await post.save();
    res.json({savedPost})
    res.send(post);
});

router.post('/addcomment', async (req,res)=>{
    
    const NewComment = new Comment ({
      
      body: req.body.body,
      usercomment: req.body.usercomment,
      postid: req.body.postid,

      
  }); 

  
  try{
      const savedComment = await NewComment.save();
      res.json(savedComment)
      console.log(req.body)
  }catch(err){
      res.status(400).send(err);
      console.log(err)
  }
});


router.get('/allposts',async(req,res)=>{
  try{


      const post = await Post.find().sort({_id:-1});
      res.json(post);
      console.log(post); 
  }catch(err){
      res.json({message : err});
  }

});


router.post('/onepost/:postid',async(req,res)=>{
  try{


      const post = await Post.findById(req.params.postid);
      res.json(post);
      console.log(post); 
  }catch(err){
      res.json({message : err});
  }

});

router.get('/allpostcomments/:postid', async(req,res)=>{
  try{
      const postcomments = await Comment.find({postid: req.params.postid});
      res.json(postcomments); 
      console.log(postcomments);
  }catch(err){
      res.json({message : err});
  }
  
});


router.post('/addupvote/:postid/:userupvote', async (req,res)=>{

  const upvote = new Upvote ({
      postid: req.params.postid,
      userupvote:req.params.userupvote,
      
  }); 
  const upvoteExist = await Upvote.findOne({ userupvote: req.params.userupvote,postid : req.params.postid });
  if (upvoteExist) {
    upvoteExist.remove({_id:upvoteExist._id});
    console.log(upvoteExist._id);
    res.status(400).send('You removed your upvote'); 
  }
  else
  { const savedUpvote = await upvote.save();
    res.json({savedUpvote});
    console.log(req.body)
  }
});


router.post('/adddownvote/:postid/:userdownvote', async (req,res)=>{


  const downvote = new Downvote ({
      postid: req.params.postid,
      userdownvote:req.params.userdownvote
      
  });
  const downvoteExist = await Downvote.findOne({ userdownvote: req.params.userdownvote,postid : req.params.postid }); 
  if (downvoteExist) {
    downvoteExist.remove({_id:downvoteExist._id});
    res.status(400).send('You removed your upvote'); 
  }
  
  else
  {
    const savedDownvote = await downvote.save();
    res.json(savedDownvote);
    console.log(req.body)
  }
});

router.get('/countcomments/:postid',async(req,res)=>{
  try{
      const commentCount = await Comment.find({postid : req.params.postid}).count();
      res.json(commentCount);
  }catch(err){

  }
});

router.get('/allupvotes/:postid',async(req,res)=>{
  try{
      const upvoteCount = await Upvote.find({postid : req.params.postid}).count();
      res.json(upvoteCount);
  }catch(err){

  }
});

router.get('/alldownvotes/:postid',async(req,res)=>{
  try{
      const downvoteCount = await Downvote.find({postid : req.params.postid}).count();
      res.json(downvoteCount);
  }catch(err){

  }
});



module.exports = router;