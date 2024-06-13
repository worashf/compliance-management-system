const expess = require('express');
const router = expess.Router();

const {getAllEmployees} = require('../controllers/employeeController')
const upload  = require("../middlewares/multer")

router.route('/employees').get(getAllEmployees);

module.exports = router;