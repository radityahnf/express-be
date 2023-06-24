const mongoose = require('mongoose');
const City = require("./city");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    profile: {
      name: String,
      address: String,
      city: {
        id: Schema.Types.ObjectId,
        name : String,
      },
      hobbies: [String]
    },
    last_login: { type: Date, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
module.exports = mongoose.model('User', userSchema);
