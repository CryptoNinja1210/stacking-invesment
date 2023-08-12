/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const router = require('express').Router();
const auth = require('../../middleware/auth.middleware.ts');
const Role = require('../../utils/userRoles.utils.ts');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware.ts');
const NotificationController = require("../../controllers/notification.controller.ts")

router.post('/create',auth(), awaitHandlerFactory(NotificationController.createNotificaion));
router.patch('/id/:id', auth(Role.Super), awaitHandlerFactory(NotificationController.updateNotificaion));
router.delete('/id/:id', auth(Role.Super), awaitHandlerFactory(NotificationController.deleteNotificaion));
router.get('/', awaitHandlerFactory(NotificationController.getAllNotificaion));
router.get('/id/:id', awaitHandlerFactory(NotificationController.getOneNotificaion));
router.get('/my/:id',auth(), awaitHandlerFactory(NotificationController.getNotificationByUserId));

module.exports = router