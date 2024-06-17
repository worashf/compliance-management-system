const express = require('express');
const cookieParser = require('cookie-parser');
//const upload = require('./middlewares/multer');
const cors = require('cors');
const path = require('path');
const env = require('dotenv');
const multer  = require("multer")
const rawBody = require('raw-body');
const upload = multer()
// Route imports
const errorMidleWare = require('./middlewares/error');
const auth = require('./routes/auth');
const institutions = require('./routes/institution.route');
const compliantRoute = require('./routes/compliant.route');
const employeeRoute = require('./routes/employee.route');
const complianceresponseRoute = require('./routes/complianceResponse.route');

// Load environment variables
env.config({ path: 'backend/configs/config.env' });

const app = express();

// Middleware for parsing JSON and URL-encoded data with larger limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// CORS middleware
app.use(cors());

// Cookie parser middleware
app.use(cookieParser());



// Middleware for parsing multipart/form-data
app.use(upload.array('attachments'));

// Serve static files from the 'attachments' directory
app.use('/attachments', express.static('attachments'));

// Routes
app.use('/api/v1', institutions);
app.use('/api/v1', auth);
app.use('/api/v1', compliantRoute);
app.use('/api/v1', employeeRoute);
app.use('/api/v1', complianceresponseRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.type === 'request.aborted') {
        console.error('Request was aborted by the client');
        res.status(400).send('Request Aborted');
    } else if (err instanceof SyntaxError) {
        console.error('Invalid JSON:', err);
        res.status(400).send('Invalid JSON');
    } else {
        console.error('Unhandled error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Uncomment the error middleware if you have custom error handling
// app.use(errorMidleWare);

module.exports = app;
