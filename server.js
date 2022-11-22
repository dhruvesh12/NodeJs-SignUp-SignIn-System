const express = require('express');
const server = express()
const mongo = require('./config/database')
const signup = require('./Signup/signup');
const auth = require('./middleware/auth');
const signIn = require('./Signin/signIn');

const User = require('./dbSchema/user');
const sub =require('./dbSchema/subcription')

server.use(express.json())

mongo.connect(server);






server.post('/signup',signup)

server.get('/login',signIn)

server.post('/addsub',(req,res)=>{
    const {email} = req.body
    const token = req.headers.token
    let val=[];
    mongo.get().collection('subcription').find().toArray((err,info)=>{

        if(err) throw err
        console.log(info)
        val.push(info)
        

    })
    console.log(val)
    //console.log(user.getQuery().token)
    mongo.get().collection('users').find({token:token}).toArray((err,data)=>{

        
        const id =data[0]._id.valueOf()
        //console.log()
        
        mongo.get().collection('subcription').insertOne({id,email},(err,info)=>{

            if(err) throw err
            res.json(info)

        })

    })
    
    //console.log(token)
    //mongo.get().collection('subcription').insertOne(req.body)
    

})