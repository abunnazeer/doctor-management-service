const Doctor = require('../models/doctorModel');

const winston = require('winston'); // make sure to install and import winston

// Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    // Validate request body here if needed

    const newDoctor = await Doctor.create(req.body);

    winston.info('New doctor created successfully');
    res.status(201).json({
      status: 'success',
      data: {
        doctor: newDoctor,
      },
    });
  } catch (err) {
    winston.error(`Error creating new doctor: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};


// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    winston.info('Fetched all doctors successfully');
    res.status(200).json({
      status: 'success',
      data: {
        doctors,
      },
    });
  } catch (err) {
    winston.error(`Error fetching all doctors: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get a single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      winston.warn(`Doctor with ID ${req.params.id} not found`);
      return res.status(404).json({
        status: 'fail',
        message: 'Doctor not found',
      });
    }

    winston.info(`Fetched doctor with ID ${req.params.id} successfully`);
    res.status(200).json({
      status: 'success',
      data: {
        doctor,
      },
    });
  } catch (err) {
    winston.error(`Error fetching doctor with ID ${req.params.id}: ${err.message}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};


// Update a doctor by ID
exports.updateDoctorById = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDoctor) {
      winston.warn(`Doctor with ID ${req.params.id} not found`);
      return res.status(404).json({
        status: 'fail',
        message: 'Doctor not found',
      });
    }

    winston.info(`Updated doctor with ID ${req.params.id} successfully`);
    res.status(200).json({
      status: 'success',
      message: 'Doctor Updated successfully', // Added success message
      data: {
        doctor: updatedDoctor,
      },
    });
  } catch (err) {
    winston.error(
      `Error updating doctor with ID ${req.params.id}: ${err.message}`
    );
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};



// Delete a doctor by ID
exports.deleteDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    // Check if doctor exists
    if (!doctor) {
      winston.error('Doctor not found');
      return res.status(404).json({
        status: 'fail',
        message: 'Doctor not found',
      });
    }

    await Doctor.findByIdAndDelete(req.params.id);

    winston.info('Doctor deleted successfully');
    res.status(200).json({
      // Changed status code to 200 for success message
      status: 'success',
      message: 'Doctor deleted successfully', // Added success message
      data: null,
    });
  } catch (err) {
    winston.error(`Error deleting doctor: ${err}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
