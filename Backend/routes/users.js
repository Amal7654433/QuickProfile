const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/userAuth')
const userControl = require('../controllers/userController')
const multer = require('../middlewares/multer')

router.post('/register', userControl.registerUser)
router.post('/login', userControl.userLogin)
router.get('/home', userAuth.verifyToken, userControl.homePage)
router.post('/image',userAuth.verifyToken, multer.upload.single('file'), userControl.imageUpload);
router.get('/profile',userAuth.verifyToken, userControl.profileEdit)
router.post('/profile',userAuth.verifyToken, userControl.profileEditPost)
router.post('/logout', userControl.logout)


module.exports = router;
