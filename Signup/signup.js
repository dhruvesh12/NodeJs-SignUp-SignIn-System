const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongo = require('../config/database')



module.exports=(req,res)=>{

    let{username,password} = req.body


    //For Password
    bcrypt.hash(password,10,(err,hash)=>{
        password = hash
    })
    
    
    mongo.get().collection('users').find({username : username}).toArray((err,data)=>{
        
        if(data.length===0){
            
            
            
            const token = jwt.sign({user:username},"randomString",{expiresIn:10000})
            console.log(token)
            mongo.get().collection('users').insertOne({username,password,token},(err,info)=>{
                if(err){
                    res.send("Failed To Store Data")
                }else{
                    res.send("Sucessfully Added Data")
                }
            })

            

        }else{
            //console.log(req.body)
            res.json({'message':"Username Already Exists"})
        }
        
        
    })

}