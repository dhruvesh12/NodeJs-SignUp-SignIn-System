const db = require('mongoose')

const UserSchema = db.Schema({
    username: {
      type: String,
      required: true
    },
    
    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  });


module.exports=db.model('user',UserSchema)