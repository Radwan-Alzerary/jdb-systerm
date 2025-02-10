const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require("connect-flash");
const compression = require("compression");
const morgan = require("morgan");
const cors = require('cors');

// Define the allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost',          // this covers port 80 (default for http)
  'http://jdp.ntu.edu.iq',
  'http://10.13.35.239:80'
];

// Create a custom CORS options object
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the incoming origin is in the allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin: ' + origin));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

// Use the custom CORS middleware
app.use(cors(corsOptions));

// Additional middleware
app.use(compression());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Import routes
const employeeRoutes = require('./routes/employee.routes');
const departmentRoutes = require('./routes/department.routes');
const collegeRoutes = require('./routes/college.routes');
const adminRoutes = require('./routes/admin.routes');
const categoryRequirementRoutes = require('./routes/categoryRequirement.routes');
const departmentRequirementRoutes = require('./routes/departmentRequirement.routes');
const workplaceRoutes = require('./routes/workplace.routes');
const certificateRoutes = require('./routes/certificate.routes');
const generalSpecializationRoutes = require('./routes/generalSpecialization.routes');
const subspecialtyRoutes = require('./routes/subspecialty.routes');
const positionRoutes = require('./routes/position.routes');
const jobGradeRoutes = require('./routes/jobGrade.routes');
const employeeSuggestionRoutes = require('./routes/employeeSuggestion.routes');
const authRoutes = require('./routes/auth.routes');

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/colleges', collegeRoutes);
// Note: Avoid duplicate mounting of the same route (e.g., adminRoutes is added twice)
app.use('/api/category-requirements', categoryRequirementRoutes);
app.use('/api/department-requirements', departmentRequirementRoutes);
app.use('/api/workplaces', workplaceRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/general-specializations', generalSpecializationRoutes);
app.use('/api/subspecialties', subspecialtyRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/job-grades', jobGradeRoutes);
app.use('/api/employee-suggestions', employeeSuggestionRoutes);

// MongoDB connection and server startup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jdb';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
