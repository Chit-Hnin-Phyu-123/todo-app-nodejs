const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/user');

class UserController{

    static async register(req, res){
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(!err){

                bcrypt.hash(req.body.password, salt, async function(err, hash) {

                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });
                    
            
                    const isSave = await user.save();
                    if(isSave){
                        res.send(user);
                    }

                });
            }
        });
    }

    static async login(req, res){
        const user = await User.findOne({ email: req.body.email });
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {

                var token = jwt.sign({
                    id: user._id,
                    name: user.name
                }, '123!@#ABC');

                if(result){
                    res.send({
                        status: "SUCCESS",
                        message: "Login successful",
                        token: token
                    });
                }else{
                    res.send({
                        status: "FAIL",
                        message: "Password doesn't match!",
                        token: null,
                    });
                }
            });
        }else{
            res.send({
                status: "FAIL",
                message: "User not found!",
                token: null,
            });
        }
    }
}

module.exports = UserController;