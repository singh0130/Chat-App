const express= require('express');

const auth= require('../middlewares/auth');
const userController= require('../controllers/user');

const router= express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

module.exports = router;