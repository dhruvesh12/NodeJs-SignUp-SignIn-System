const jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{

    const token = req.header('token')
   

    if(!token){
        res.json({message:"Auth Error"})
    }
    try {
        
        jwt.verify(token, "randomString");
        next();
      } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
      }

}