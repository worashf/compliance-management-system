const expess = require('express');
const router = expess.Router();

const {createCompliant, getAllCompliants} = require('../controllers/compliantController')
const upload  = require("../middlewares/multer")

router.route('/compliants',upload.array("compliants", 10)).post(createCompliant);

router.route('/compliants/:employeeId').get(getAllCompliants);

module.exports = router;