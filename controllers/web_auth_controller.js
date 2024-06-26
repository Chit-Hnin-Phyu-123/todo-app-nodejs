const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/user');


class WebAuthController{

    static async viewLogin(req, res){
        res.render('login.ejs');
    }

    static async viewRegister(req, res){
        res.render('register.ejs');
    }

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
                        res.redirect('login');
                    }
                });
            }
        });
    }

    static async login(req, res){
        
        const user = await User.findOne({ email: req.body.email });

        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
            
                if(result){
                    req.session.auth = true;
                    req.session.name = user.name;
                    req.session.userId = user._id;
                    
                    res.redirect('/web/home');
                }else{
                    res.redirect('back');
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

module.exports = WebAuthController;