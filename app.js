/* LINKS ACTIVATIONS */ 

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))



// Publich directory where the static files are located
app.use(express.static(__dirname + 'public'));



/* PROJECT */ 

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/sign-in.html");
});

app.post("/", (req, res) => {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/6121dbaea7";

  const options = {
    method: "POST",
    auth: "vito1:23446ab11858a753330c1a709eb4602c-us21"
  };

  const request = https.request(url, options, (response) => {
      if (response.statusCode === 200) { 
        res.sendFile(__dirname +   "/success.html");
      } else {
        res.sendFile(__dirname +   "/failure.html");
      }

      response.on("data", (data) => {
        console.log(JSON.parse(data));
      });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Working on port 3000");
});

//API
//23446ab11858a753330c1a709eb4602c-us21

//List ID
//6121dbaea7