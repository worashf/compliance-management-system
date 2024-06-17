const expess = require('express');
const router = expess.Router();

const {createCompliant, getAllCompliants, getSingleCompliant, getValidAllCompliants, getAllInValidCompliants} = require('../controllers/compliantController')
// const upload  = require("../middlewares/multer")

//router.route('/compliants', upload.array("attachments")).post(createCompliant);

router.route('/compliants').post(createCompliant);

router.route('/compliants').get(getAllCompliants);
router.route('/compliant-detail/:compliantId').get(getSingleCompliant);
router.route('/valid-compliants').get(getValidAllCompliants);
router.route('/invalid-compliants').get(getAllInValidCompliants);

module.exports = router;