// todo
const mongoose = require("../middleware/mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");

// todo
const itemSchema = new mongoose.Schema({
  itemImg: {
    type: String,
  },
  itemName: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  itemQty: {
    type: String,
    required: true,
    min: 1,
  },
  itemPrice: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// todo
itemSchema.plugin(mongoosePaginate);

// todo
module.exports = mongoose.model("Item", itemSchema);
