const expess = require('express');
const router = expess.Router();

const {saveInstitution, getAllInstitutions} = require('../controllers/institutionController')
const upload  = require("../middlewares/multer")

router.route('/institutions').post(saveInstitution);
router.route('/institutions').get(getAllInstitutions);


module.exports = router;