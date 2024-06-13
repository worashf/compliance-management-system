const expess = require('express');
const router = expess.Router();

const {createCompliant, getAllCompliants, getSingleCompliant} = require('../controllers/compliantController')
// const upload  = require("../middlewares/multer")

router.route('/compliants').post(createCompliant);

router.route('/compliants').get(getAllCompliants);
router.route('/compliant-detail/:compliantId').get(getSingleCompliant);

module.exports = router;