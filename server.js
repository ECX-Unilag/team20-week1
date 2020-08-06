const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db    = require("./config/db");

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));



MongoClient.connect(db.url || process.env.DB, (err, database) => {
    if(err) return console.log(err);
    const myDB = database.db('CMS');
    require("./app/routes")(app, myDB);
    app.listen(8000 || process.env.PORT, function(){
        console.log("Server is running at port ", process.env.PORT)
    
})
})

//We are using mongoclient and hardcoding the username and pass.