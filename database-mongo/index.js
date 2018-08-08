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
  url: {type: String, unique: true},
  name: String,
  rating: Number,
  description: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

websiteSchema.post('save', (error, doc, next) => {
  if(error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
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
});

var userSchema = mongoose.Schema({
  email: {type: String, unique: true, required: true, trim: true}
  username: {type: String, unique: true, required: true, trim: true},
  password: {type: String, required: true},
  passwordConf: {type: String, required: true},
});


userSchema.post('save', (error, doc, next) => {
  if(error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
});

var Website = mongoose.model('Website', websiteSchema);
var Review = mongoose.model('Review', reviewSchema);
var User = mongoose.model('User', userSchema);

var selectAll = function(callback) {
  Website.find({}, function(err, websites) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, websites);
    }
  });
};

// before we are creating the website, check and see if the website has been added
var createWebsite = function(url, callback) {
  Website.create({url: url}, (err, website) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, website);
    }
  });
}

var findWebsiteByURL = function(url, callback) {
  Website.findOne({url: url}, (err, website) => {
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

var getWebsiteReviews = function(websiteId, callback) {
  Review.find({website: websiteId}, (err, reviews) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, reviews);
    }
  })
}

var createUser = function(user) {
  User.create(user, (err, user) => {
    if(err) {
      // callback(err, null);
      return next(err);
    } else {
      callback(null, user);
    }
  });
}

module.exports.selectAll = selectAll;
module.exports.createWebsite = createWebsite;
module.exports.findWebsite = findWebsite;
module.exports.createReview = createReview;
module.exports.getWebsiteReviews = getWebsiteReviews;
module.exports.findWebsiteByURL = findWebsiteByURL;