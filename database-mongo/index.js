var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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
  imageUrl: String,
  name: String,
  rating: {type: Number, default: 0},
  countReviews: {type: Number, default: 0},
  totalScore: {type: Number, default: 0},
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

// var userSchema = mongoose.Schema({
//   username: {type: String, unique: true, required: true, trim: true},
//   email: {type: String, unique: true, required: true, trim: true},
//   password: {type: String, required: true}
// });


// userSchema.post('save', (error, doc, next) => {
//   if(error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('There was a duplicate key error'));
//   } else {
//     next(error);
//   }
// });

// //before save
// userSchema.pre('save', (next) => {
//   var user = this;
//   console.log(user);
//   bcrypt.hash(user.password, 10, (err, hash) => {
//     if(err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   });
// })

var Website = mongoose.model('Website', websiteSchema);
var Review = mongoose.model('Review', reviewSchema);
//var User = mongoose.model('User', userSchema);

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
var createWebsite = function(website, callback) {
  // save to db
  Website.create(website, (err, website) => {
    if(err) {
      callback(err, null);
    } else {      
      callback(null, website);      
    }
  });
}

var updateWebsite = function(website, callback) {
  Website.update({_id: website._id}, {$set: website}, (err, website) => {
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

// var createUser = function(user, callback) {
//   User.create(user, (err, user) => {    
//     if(err) {
//       // callback(err, null);
//       callback(err, null);
//     } else {
//       callback(null, user);
//     }
//   });
// }

module.exports.selectAll = selectAll;
module.exports.createWebsite = createWebsite;
module.exports.findWebsite = findWebsite;
module.exports.createReview = createReview;
module.exports.updateWebsite = updateWebsite;
module.exports.getWebsiteReviews = getWebsiteReviews;
module.exports.findWebsiteByURL = findWebsiteByURL;
//module.exports.createUser = createUser;