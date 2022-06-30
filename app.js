// jshint esversion:6


const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req , res){
  res.sendFile(__dirname + "/signup.html");

app.post("/" , function(req , res){

  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/ae57c9b2df";
  const options = {
    method : "POST",
    auth : "gandhi5:059da8d3edd6deeac0ddc4d7af3e923d-us14"
  }

  const request = https.get(url , options , function(response){

      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/sucess.html")
      } else {
        res.send(__dirname + "/failure.html")
      }


    response.on("data" , function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
})
  app.post("/failure" , function(req , res){
    res.redirect("/")
  })



})
// app.set('port', process.env.PORT || 8080);
app.listen(process.env.PORT || 3000, function(){
  console.log("server port start at 2000");
});



// API key
// 68efe0723c37ce4f671cac9b4e7d78b1-us14

// ae57c9b2df
