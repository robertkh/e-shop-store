// todo
const { ml, f_str, rl } = require("./logger");
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

// todo
mongoose.set("useCreateIndex", true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => ml.log(f_str("MongoDB has been connected!")))
  .catch((err) => rl.log(f_str("Something went wrong", err)));

// todo
module.exports = mongoose;
