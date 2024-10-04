// server/app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chartRoutes = require('./routes/chartRoutes'); // Import chart routes
dotenv.config();

// Create an Express app
const app = express();
app.use(express.json());
app.use(cors());

// Use the chart routes
app.use('/api', chartRoutes);

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
