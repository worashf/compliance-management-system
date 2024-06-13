const expess = require('express');
const router = expess.Router();

const { signup, login, getAllUsers} = require('../controllers/authController');
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
router.route('/signup').post(signup);
router.route('/login').post(login);
//Admin routes
router.route('/users').get(getAllUsers);
// router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
// router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
//                                .put(isAuthenticatedUser,authorizeRoles("admin"), adminUpdateUser)
//                                .delete(isAuthenticatedUser,authorizeRoles("admin"), adminDeleteUser)

module.exports = router;