var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var db = require('../database-mongo');
var libs = require('../libs');

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
//http://localhost:3000/websites/5b6b9681be6ff340c81ea1ff
app.post('/api/websites/new', function(req, res) {
	//TODO search the db for the query website
	// create a new one if can't find any match
  var url = req.body.url; 
  db.findWebsiteByURL(url, (err, website) => {
    if(err) {
      res.sendStatus(500);
    } else if (website === null) {
      libs.promiseScrape(url).then((data) => {
        db.createWebsite(data, (err, website) =>{
          if(err){
            res.send({error: err.message});
          }
          res.send({websiteId: website._id});
          // console.log('start redirect the new page', '/websites/'+website._id)
          // res.redirect('/websites/'+website._id);
        })  
      })     
    } else {
      // console.log('start redirect to page', '/websites/'+website._id)
      // res.redirect('/websites/'+website._id);
      res.send({websiteId: website._id});
    }
  });
});


app.get('/websites/:websiteId', (req, res) => {
  var _id = req.params.websiteId;
  db.findWebsite(_id, (err, website) => {
    if(err) {
      res.sendStatus(500);
    }
    //res.sendStatus(300);
    res.send(req.params);
  });  
})


app.get('/api/websites/:websiteId.json', (req, res) => {
  var _id = req.params.websiteId;
  db.findWebsite(_id, (err, website) => {
    if(err) {
      res.sendStatus(500);
    }
    //res.sendStatus(300);
    res.send({website: website});
  });  
})

// TODO change this one to use para get
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
app.post('/api/reviews/new', (req, res) => {
  var review = req.body.review;
  db.createReview(review, (err, review) => {
    if(err) {
      res.sendStatus(500);
    }
    res.send({review: review});
  })
});

// get review by website
// TODO change this one to use para get
app.post('/api/website/reviews.json', (req, res) => {
  var websiteId = req.body.websiteId;
  db.getWebsiteReviews(websiteId, (err, reviews) => {
    if(err) {
      res.sendStatus(500);
    }
    res.json(reviews);
  });  
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

