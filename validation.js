const Joi= require('@hapi/joi');


//register validation
const registerValidation = data => {
const schema = Joi.object({
    fullname: Joi.string().min(6).required(),
    username: Joi.string().min(6).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
    });
    return schema.validate(data);
};

//login validation
const loginValidation = data =>{
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
        });
        return schema.validate(data);
    };


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;