const expess = require('express');
const router = expess.Router();

const {createComplianceResponse, getAllCompliantResponses, getSingleCompliantResponse,getAllEmployeeCompliantsResponses} = require('../controllers/complianceResponseController')


router.route('/compliant-responses').post(createComplianceResponse);

router.route('/compliant-responses').get(getAllCompliantResponses);

router.route('/compliant-responses/:compliantId').get(getSingleCompliantResponse);

router.route('/employees/compliants/responses').get(getAllEmployeeCompliantsResponses);
module.exports = router;