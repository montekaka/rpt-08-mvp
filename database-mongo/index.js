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
  website_url: String,
  website_name: String,
  website_rating: Number,
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

module.exports.selectAll = selectAll;