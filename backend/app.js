const express = require('express');
const cookieParser = require("cookie-parser");
// const upload = require("./middlewares/multer");
const cors = require("cors");
const path = require('path');
const env = require("dotenv");
const multer = require("multer");
const upload = multer();

const errorMidleWare = require('./middlewares/error');
const auth = require('./routes/auth');
const institutions = require('./routes/institution.route');
const compliantRoute = require('./routes/compliant.route');
const employeeRoute = require('./routes/employee.route');

env.config({ path: 'backend/configs/config.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// for parsing multipart/form-data
app.use(upload.array("attachments"));

// app.use(upload.array());
// app.use(express.static("attachments"));
// Serve static files from the 'attachments' directory
app.use('/attachments', express.static('attachments'));

// Institution route
app.use('/api/v1', institutions);

// User authentication
app.use('/api/v1', auth);

// Compliant route
app.use('/api/v1', compliantRoute);

// Employee route 
app.use('/api/v1', employeeRoute);

// if (process.env.NODE_ENV === 'PRODUCTION') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));
//     app.use('/attachments', express.static(path.join(__dirname, '..', 'attachments')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
//     });
// }

// Error middleware (uncomment if needed)
// app.use(errorMidleWare);

module.exports = app;
