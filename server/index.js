var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var db = require('../database-mongo');

var app = express();
app.use(bodyParser.json());

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/api/websites.json', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/api/websites.json', function(req, res) {
	//TODO search the db for the query website
	// create a new one if can't find any match
  var url = req.body.url;
  db.createWebsite(url, (err, website)=>{
    if(err){
      res.sendStatus(500);
    }
    res.send({website: website});
  })    
});

app.post('/api/website.json', function(req, res) {
  var _id = req.body._id;
  db.findWebsite(_id, (err, website) => {
    if(err) {
      res.sendStatus(500);
    }
    res.send({website: website});
  });
});

// reviews

app.post('/api/reviews.json', (req, res) => {
  var review = req.body.review;
  console.log('saving', review);
  // db.createReview(review, (err, review) => {
  //   if(err) {
  //     res.sendStatus(500);
  //   }
  //   res.send({review: review});
  // })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

