const Router = require('express').Router();
const authRoutes = require('./authenticate');
const laboratoryRoutes = require('./laboratory');
const scheduleRoutes = require('./schedule');
const inventoryRoutes = require('./inventory');
const licenseRoutes = require('./license');
const userRoutes = require('./user');
const { sessionMiddleware } = require('../middlewares/session');



Router.use('/', authRoutes);
Router.use('/laboratory', sessionMiddleware, laboratoryRoutes);
Router.use('/schedule', sessionMiddleware, scheduleRoutes);
Router.use('/inventory', sessionMiddleware, inventoryRoutes);
Router.use('/license', sessionMiddleware, licenseRoutes);
Router.use('/user', sessionMiddleware, userRoutes);

module.exports = Router;
