mongoose = require('mongoose'),
  conn = mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/brand-marinade'),
  Product = require('../models/products.js'),

Product.remove({}, function(err) {
  if (err) console.log('ERROR:', err)
})

var products = [
                {
                  item: "Crewneck",
                  sizes: {red: true,
                        green: true,
                        blue: false
                      },
                  colors: {small: false,
                        medium: true,
                        large: true
                      },
                  brands: ["American Apparel"],
                  tags: ["hella cool"],
                  price: 50
                },
                {
                  item: "Hoodie",
                  sizes: {red: false,
                          green: true,
                          blue: false
                        },
                  colors: {small: true,
                          medium: true,
                          large: true
                        },
                  brands: ["Galvins"],
                  tags: ["super sweet"],
                  price: 45
                }
              ]

Product.create(products, function(err, data){
  err ? console.log(err) : console.log("created:", data);
  mongoose.connection.close();
})