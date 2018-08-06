var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://localhost/yelpsaas', {
  useMongoClient: true
});

promise.then((db) => {
  console.log('woohoo mongoose connected successfully');
}).catch((err) => {
  console.log('mongoose connection error');
});

var Schema = mongoose.Schema;
var db = mongoose.connection;

// db.on('error', function() {
//   console.log('mongoose connection error');
// });

// db.once('open', function() {
//   console.log('mongoose connected successfully');
// });

var websiteSchema = mongoose.Schema({
  url: String,
  name: String,
  rating: Number,
  description: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

var reviewSchema = mongoose.Schema({
  website: { type: Schema.Types.ObjectId, ref: 'Website' },
  text: String,
  rating: Number,
  screenname: String,
  upvote: Number,
  downvote: Number,
  createdDate: Date,
  updatedDate: Date
})

var Website = mongoose.model('Website', websiteSchema);
var Review = mongoose.model('Review', reviewSchema);

var selectAll = function(callback) {
  Website.find({}, function(err, websites) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, websites);
    }
  });
};

var createWebsite = function(url, callback) {
  Website.create({url: url}, (err, website) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, website);
    }
  });
}

var findWebsite = function(id, callback) {
  Website.findOne({_id: id}, (err, website) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, website);
    }
  });
}

var createReview = function(review, callback) {
  Review.create(review, (err, review) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, review);
    }
  });
}

module.exports.selectAll = selectAll;
module.exports.createWebsite = createWebsite;
module.exports.findWebsite = findWebsite;
module.exports.createReview = createReview;