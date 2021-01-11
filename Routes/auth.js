const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');




router.post('/register', async (req, res) => {


    //validating data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //checking if user already in use
    const usernameExist = await User.findOne({ username: req.body.username });
    const emailExist = await User.findOne({ email: req.body.email });
    if (usernameExist) return res.status(400).send('username already in use');
    if (emailExist) return res.status(400).send('email already in use');

    //hashing password
    //const salt=await bcrypt.genSalt(10);
    //const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creating user
    const user = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        //password: hashedPassword,
        password: req.body.password,
        role: req.body.role,
        phone: req.body.phone
    });
    try {
        const savedUser = await user.save();
        res.json({ user: savedUser, status: true, message: "You successfully created an account" });
        console.log(req.body);
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }

});
//login
router.post('/login', async (req, res) => {


    //validating data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message, status: false });

    //checking username
    const userExist = await User.findOne({ username: req.body.username });
    if (!userExist) return res.status(400).json({ message: 'wrong Username', status: false });

    //checking password

    //const passwordValidbcrypt = await bcrypt.compare(req.body.password , user.password); 
    //if(!passwordValidbcrypt) return res.status(400).send('wrong password')
    const passwordValid = req.body.password.localeCompare(userExist.password);
    if (passwordValid) return res.status(400).json({ message: 'wrong password', status: false });



    console.log('you are logged in');
    //res.json(userExist)
    res.json(userExist);
    console.log(userExist);

    //Creating and assigning token
    /*const token= jwt.sign({_id: User._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);*/

});


//show users
router.get('/show', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});



module.exports = router;