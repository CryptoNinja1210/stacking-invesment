/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const router = require('express').Router();
const auth = require('../../middleware/auth.middleware.ts');
const Role = require('../../utils/userRoles.utils.ts');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware.ts');
const TransactionController = require("../../controllers/transaction.controller.ts")

router.post('/create',auth(), awaitHandlerFactory(TransactionController.createTransaction));
router.patch('/id/:id', auth(Role.Super), awaitHandlerFactory(TransactionController.updateTransaction));
router.delete('/id/:id', auth(Role.Super), awaitHandlerFactory(TransactionController.deleteTransaction));
router.get('/', awaitHandlerFactory(TransactionController.getAllTransaction));
router.get('/id/:id', awaitHandlerFactory(TransactionController.getOneTransaction));
router.get('/latest', awaitHandlerFactory(TransactionController.getLatestTransaction));
router.get('/my/:id',auth(), awaitHandlerFactory(TransactionController.getTransactionByUserId));

module.exports = router