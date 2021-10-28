const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const coursesRoutes = require('./course');
const weekRoutes = require('./week');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/courses', coursesRoutes);
router.use('/week', weekRoutes);


module.exports = router;
