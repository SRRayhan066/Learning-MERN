const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../databaseScema/userSchema');
const User = new mongoose.model('User',userSchema);

router.post('/signup', async(req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const user = new User({
        email : req.body.email,
        userName : req.body.userName,
        password : hashedPassword
    });
    user.save()
        .then(()=>{
            res.status(200).json({
                message : 'Successfully account created'
            })
        }).catch(err =>{
            res.status(500).json({
                error : err
            })
        })
});

router.post('/login', async(req,res)=>{
    try{
        const user = await User.find({ userName : req.body.userName});
        if(user && user.length>0){
            const isValid = await bcrypt.compare(req.body.password, user[0].password);
            if(isValid){
                //generate token
                const token = jwt.sign({
                    userName : user[0].userName,
                    userId : user[0]._id
                },process.env.JWT_SECRET,{
                    expiresIn : '1h' 
                });

                res.status(200).json({
                    authentication_token : token,
                    message : 'Login successfull'
                })

            }else{
                res.status(401).json({
                    message : 'Authentication Failed'
                })
            }
        }else{
            res.status(401).json({
                message : 'Authentication Failed'
            })
        }
    }catch {
        res.status(401).json({
            message : 'Authentication Failed'
        })
    }
    
});

module.exports = router;