const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String },
  contectno: { type: String },
  status: { type: String },
});


module.exports = mongoose.model('Users', userSchema);
