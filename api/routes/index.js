const Router = require('express').Router();
const userRoutes = require('./user');
const laboratoryRoutes = require('./laboratory');
const scheduleRoutes = require('./schedule');
const inventoryRoutes = require('./inventory');
const licenseRoutes = require('./license');
const { sessionMiddleware } = require('../middlewares/session');



Router.use('/laboratory', sessionMiddleware, laboratoryRoutes);
Router.use('/schedule', sessionMiddleware, scheduleRoutes);
Router.use('/inventory', sessionMiddleware, inventoryRoutes);
Router.use('/license', sessionMiddleware, licenseRoutes);
Router.use('/', userRoutes);


module.exports = Router;
