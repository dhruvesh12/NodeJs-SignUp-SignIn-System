

const db = require('mongoose')

const subcriptionSchema = db.Schema({
    user_id:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    }
  });


module.exports=db.model('subcription',subcriptionSchema)