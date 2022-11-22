const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb://localhost:27017/crud';

const dotenv = require('dotenv').config()
let mongodb;

const PORT = process.env.PORT

function connect(app){
    mongoClient.connect(mongoDbUrl,{useNewUrlParser:true}, (err, db) => {
        if(err){
            console.log("Failed To Connect To Database")
        }
        mongodb = db.db('crud');
        
        console.log("Connected To DataBase Sucessfully")
        app.listen(PORT, function (){
            console.log(`Listening To Port`,PORT);
        });
    });
}
function get(){
    return mongodb;
}



module.exports = {
    connect,
    get
};