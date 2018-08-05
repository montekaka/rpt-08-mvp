var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelpsaas');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var websiteSchema = mongoose.Schema({
  url: String,
  name: String,
  rating: Number,
  description: String
});

var Website = mongoose.model('Website', websiteSchema);

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

module.exports.selectAll = selectAll;
module.exports.createWebsite = createWebsite;
module.exports.findWebsite = findWebsite;