const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorID: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  contact: {
    phone: String,
    email: String,
    address: String,
  },
  specialization: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    unique: true,
    required: true,
  },
  hospitalAffiliation: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

module.exports = mongoose.model('Doctor', doctorSchema);
