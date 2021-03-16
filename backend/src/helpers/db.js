const mongoose = require('mongoose');

module.exports =()=>{
    mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.nq0cf.mongodb.net/test`, 
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify: true
    })
    const db = mongoose.connection;
    db.on('open', ()=>{
        console.log("Mongodbga online ulandik");
    })
    db.on('error', ()=>{
        console.log("Mongodbga ulana olmadik");
    })
}