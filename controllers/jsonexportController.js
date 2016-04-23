var Product = require('../models/products')
var jsonexport = require('jsonexport')

jsonexportController = {
  convertJson: function () {
    var contacts = [{
        name: 'Bob',
        lastname: 'Smith'
    },{
        name: 'James',
        lastname: 'David'
    },{
        name: 'Robert',
        lastname: 'Miller'
    },{
        name: 'David',
        lastname: 'Martin'
    }];

    jsonexport(contacts,function(err, csv){
      if(err) return console.log(err);
      console.log("CSV:", csv);
    });

  }
}

module.exports = jsonexportController