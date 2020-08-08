const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const cors = require("cors");
//const db    = require("./config/db");


app.use(cors());




MongoClient.connect(process.env.DB, (err, database) => {
    if(err) return console.log(err);
    
    const myDB = database.db('CMS');
    require('./app/routes')(app, myDB)

    app.listen( process.env.PORT, function(){
        console.log("Server is running at port ", process.env.PORT)
    
})
})

//We are using mongoclient and hardcoding the username and pass.