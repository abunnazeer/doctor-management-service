const express = require('express');
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
} = require('../controllers/doctorController');

const router = express.Router();

router.post('/create-doctor', createDoctor);
router.get('/get-all-doctors', getAllDoctors);
router.get('/get-doctor/:id', getDoctorById);
router.put('/update-doctor/:id', updateDoctorById);
router.delete('/delete-doctor/:id', deleteDoctorById);

module.exports = router;
