const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const ProfileSchema = new Schema({
  user: {
   type: Schema.Types.ObjectId,
    ref: 'users'
  },
  address: {
    type: String,
    required: true
  },
  emergencyContact: [
    {
      name: {
        type: String,
        required: true
      },
      relation: {
        type: String,
        required: true
      },
      phonenumber: {
        type: String,
        required: true
      }
    }
  ],
  levelone: {
    type: Boolean,
    default: false,
  },
  leveloneExp: {
    type: Date
  }
  
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);