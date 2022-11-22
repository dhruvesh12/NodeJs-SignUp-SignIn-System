const mongo = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports=(req,res)=>{

    const {username,password} = req.body
    const user = mongo.get().collection('users').find({username:username}).toArray((err,info)=>{
        if(err){
            res.send("Received Error While Finding User",err)
        }
        if(info.length !=0 ){
            bcrypt.compare(password,info[0].password,(err,data)=>{
                if(err) throw err
                if(data){
                    jwt.sign({user:data.insertedId},
                        "randomString",
                        {
                            expiresIn:"5h"
                        },(err,token)=>{

                            if(err){
                                res.json(err)
                            }else{
                                
                                info.token = token
                                
                            }
                        }
                        )
                    res.status(200).json(info);
                    
                }else{
                    res.status(400).send("Invalid Credentials");
                }
            })
            

        }else{
            res.send("No Data Found")
        }
        
    })

    


}