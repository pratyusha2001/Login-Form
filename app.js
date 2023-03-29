var express = require("express");
var bodyParser = require("body-parser");
var { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxIdleTimeMS: 5000
  };

const uri = "";
const client = new MongoClient(uri, OPTIONS);

var app=express(); 
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

async function run() {
    try {
        await client.connect();
        const db = client.db('Form');
        const collection = db.collection('details');

        app.post('/signup', function (req, res) {
            var name = req.body.name;
            var email = req.body.email;

            var data = {
                "user": name,
                "email": email
            }   
            console.log(data);
                collection.insertOne(data);
                console.log("data inserted");
               
            return res.redirect('success.html');
        });
        app.get('/',function(res){
            return res.redirect('index.html');
        }).listen(3000)
        
        console.log("server listening to port 3000");

    } 
    catch(err)
    {
        console.log(err);
    }
}

run();
client.close();