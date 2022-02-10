const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose); // This is going to add on to our schema a field for username and a field for password, it will make sure those usernames are unique, and give us some additional methods that we can use

module.exports = mongoose.model("User", UserSchema);
