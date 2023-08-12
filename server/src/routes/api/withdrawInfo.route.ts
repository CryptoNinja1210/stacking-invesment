/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const router = require('express').Router();
const auth = require('../../middleware/auth.middleware.ts');
const Role = require('../../utils/userRoles.utils.ts');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware.ts');
const WithdrawInfoController = require("../../controllers/withdrawInfo.controller.ts")

router.post('/create',auth(), awaitHandlerFactory(WithdrawInfoController.createWithdrawInfo));
router.patch('/id/:id', auth(Role.Super), awaitHandlerFactory(WithdrawInfoController.updateWithdrawInfo));
router.delete('/id/:id', auth(Role.Super), awaitHandlerFactory(WithdrawInfoController.deleteWithdrawInfo));
router.get('/', awaitHandlerFactory(WithdrawInfoController.getAllWithdrawInfo));
router.get('/id/:id', awaitHandlerFactory(WithdrawInfoController.getOneWithdrawInfo));
router.get('/latest', awaitHandlerFactory(WithdrawInfoController.getLatestWithdrawInfo));
router.get('/my/:id',auth(), awaitHandlerFactory(WithdrawInfoController.getWithdrawInfoByUserId));

module.exports = router