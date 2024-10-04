// server/routes/chartRoutes.js
const express = require('express');
const { generateChart } = require('../controllers/chartController'); // Import the controller

const router = express.Router();

// POST route to generate a Mermaid chart
router.post('/generate-chart', generateChart);

module.exports = router;
