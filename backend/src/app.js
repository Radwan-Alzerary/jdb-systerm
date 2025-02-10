const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require("connect-flash");
const compression = require("compression");
const morgan = require("morgan");


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
// const adminRoutes = require('./routes/admin.routes');

const app = express();
const cors = require('cors');
const corsOptions = {
  origin: [
    /^(http:\/\/.+:8080)$/,
    /^(http:\/\/.+:8085)$/,
    /^(http:\/\/.+:80)$/,
    'http://jdp.ntu.edu.iq', // Removed trailing slash
    /^(http:\/\/.+:3000)$/,
    /^(http:\/\/.+:5000)$/,
    /^(http:\/\/.+:3001)$/,
    /^(http:\/\/.+:3100)$/,
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(compression());
app.use(morgan("dev"));

// Middleware
app.use(bodyParser.json());

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/admins', adminRoutes);
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
