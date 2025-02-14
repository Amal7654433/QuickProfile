const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middlewares/adminAuth')
const admincontrol = require('../controllers/adminController')

router.get('/admin/dashboard', adminAuth, admincontrol.dashboard)
router.post('/admin/login', admincontrol.adminLogin)
router.post('/admin/logout', adminAuth, admincontrol.adminLogout)
router.get('/admin/dashboard/edit/:userId', adminAuth, admincontrol.userEdit)
router.patch('/admin/dashboard/edit/:userId', adminAuth, admincontrol.userEditPost)
router.delete('/admin/dashboard/delete/:userId', adminAuth, admincontrol.userRemove)
router.get('/admin/search/:key',adminAuth, admincontrol.userSearch)
router.post('/admin/add', adminAuth, admincontrol.addUser)

module.exports = router;
