//jshint esversion: 6
'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const port = 3000;
const app = express();

require('dotenv').config();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/home.html')
});
app.get('/piggame', function(req, res){
  res.sendFile(__dirname + '/public/PigGame/index.html')
});
app.get('/ballscatch', function (req, res){
  res.sendFile(__dirname + '/public/BallsCatch/index.html');
});
app.get('/drumkit', function(req,res){
  res.sendFile(__dirname + '/public/DrumKit/index.html')
});
app.get('/guess', function(req, res){
  res.sendFile(__dirname + '/public/GuessMyNumber/guessMyNumber.html')
});
app.get('/gamespage', function(req,res){
  res.sendFile(__dirname + '/gamespage.html')
});
app.get('/singup', function(req,res){
  res.sendFile(__dirname + '/public/SingUp/singup.html')
});
app.get('/home', function(req, res){
  res.sendFile(__dirname + '/home.html')
});
app.post('/', function(req, res){
    const fName = req.body.firstN;
    const lName = req.body.lastN;
    const eMail = req.body.emaiL;

    const data = {
      members: [
        {
          email_address: eMail,
          status: "subscribed",
          merge_fields: {
              FNAME: fName,
              LNAME: lName
            }
        }
      ]
    };
    const jsonData = JSON.stringify(data);

    const listId = process.env.MAILCHIMP_LISTID;
    const url = "https://us18.api.mailchimp.com/3.0/lists/" + listId;

    const options = {
      method: "POST",
      auth: process.env.MAILCHIMP_AUTH,
    }

    const request = https.request(url, options, function(response){
      response.on("data", function(data){
        var log = JSON.parse(data)
          // console.log(log);
          console.log(log.error_count);
          if (log.error_count > 0) {
            res.sendFile(__dirname + '/public/SingUp/failure.html');
          }else {
            res.sendFile(__dirname + '/public/SingUp/success.html');
          }
      })
    }
  );
    request.write(jsonData);
    request.end();
});
app.listen(process.env.PORT || port, function(){
  console.log('Server is running on port => ' + port);
});
