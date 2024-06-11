const express = require('express');
const cookieParser = require("cookie-parser")
const upload  = require("./middlewares/multer")
const cors = require("cors")
const path = require('path')
const env = require("dotenv")

const errorMidleWare = require('./middlewares/error');
const auth = require('./routes/auth');
const institutions = require('./routes/institution.route');
const compliantRoute = require('./routes/compliant.route');


env.config({ path: 'backend/configs/config.env' })

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())



// // for parsing multipart/form-data
app.use(upload.array("compliants"));
// // Serve static files from the 'uploads' directory
// app.use('/attachments', express.static(path.join(__dirname, 'attachments')));
// institution route
app.use('/api/v1', institutions);
//user authentiction
app.use('/api/v1', auth);

//compliant route
app.use('/api/v1', compliantRoute);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
// app.use(errorMidleWare);
module.exports = app;