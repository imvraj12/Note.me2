const mongoose = require("mongoose");
const mongoURI = 'mongodb+srv://devesh518:ddrk2002@notes.tbk3fqr.mongodb.net/inotebook';
 
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
 
module.exports = connectToMongo;