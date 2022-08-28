const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const User= require('../models/user');

exports.signup= (req, res, next) => {
    const { name, email, phone, password }= req.body;
    const saltRound=10;
    bcrypt.genSalt(saltRound, function(err, salt){
        bcrypt.hash(password, salt, function(err, hash){
            User.create({name, email, phone, password: hash})
            .then(() => {
                res.status(201).json({success: true, message: 'User successfully created! You may login now!'});
            })
            .catch((err) => {
                res.status(403).json({success: false, message: 'User exists! Please login!'});
            });
        });
    });
};

function generateAccessTokenId(id)
{
    return jwt.sign(id, process.env.TOKEN_SECRET);
}

exports.login= (req, res, next) => {
    const { email, password }= req.body;
    User.findAll({where: {email}})
    .then(user => {
        if(user.length>0)
        {
            bcrypt.compare(password, user[0].password, function(err, response){
                if(err)
                {
                    console.log(err);
                    return res.json({success: false, message: 'Something went wrong'});
                }
                if(response)
                {
                    const jwttoken= generateAccessTokenId(user[0].id);
                    res.status(200).json({token: jwttoken, success: true, message: 'Successfully Logged In', user: user[0]});
                }
                else 
                {
                    return res.status(401).json({success: false, message: 'Wrong Password! Please try again!'});
                }
            });
        }
        else 
        {
            return res.status(404).json({success: false, message: 'User does not exist!'});
        }
    })
}