var mongoose = require('mongoose')
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  item: String,
  sizes: {red: Boolean,
          green: Boolean,
          blue: Boolean
        },
  colors: {small: Boolean,
          medium: Boolean,
          large: Boolean
        },
  brands: [],
  tags: [],
  price: Number
})

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;