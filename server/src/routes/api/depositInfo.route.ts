/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const router = require('express').Router();
const auth = require('../../middleware/auth.middleware.ts');
const Role = require('../../utils/userRoles.utils.ts');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware.ts');
const DepositInfoController = require("../../controllers/depositInfo.controller.ts")

router.post('/create',auth(), awaitHandlerFactory(DepositInfoController.createDepositInfo));
router.patch('/id/:id', auth(Role.Super), awaitHandlerFactory(DepositInfoController.updateDepositInfo));
router.delete('/id/:id', auth(Role.Super), awaitHandlerFactory(DepositInfoController.deleteDepositInfo));
router.get('/', awaitHandlerFactory(DepositInfoController.getAllDepositInfo));
router.get('/id/:id', awaitHandlerFactory(DepositInfoController.getOneDepositInfo));
router.get('/latest', awaitHandlerFactory(DepositInfoController.getLatestDepositInfo));
router.get('/my/:id',auth(), awaitHandlerFactory(DepositInfoController.getDepositInfoByUserId));

module.exports = router