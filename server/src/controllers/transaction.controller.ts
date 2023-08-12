const TransactionService = require("../services/transaction.service.ts");

class TransactionController {
    createTransaction = async (req, res, next) => {
        try {
            const result = await TransactionService.createTransaction(req.body);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    updateTransaction = async (req, res, next) => {
        try {
            const result = await TransactionService.updateTransaction(req.body, req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAllTransaction = async (req, res, next) => {
        try {
            const result = await TransactionService.getAllTransaction();
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getTransactionByUserId = async (req, res, next) => {
        try {
            const result = await TransactionService.getTransactionByUserId(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getOneTransaction = async (req, res, next) => {
        try {
            const result = await TransactionService.getOneTransaction(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
    getLatestTransaction = async (req, res, next) => {

        try {
            const result = await TransactionService.getLatestTransaction( req.body.sortby, req.body.page, req.body.items);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
    deleteTransaction = async (req, res, next) => {
        try {
            const result = await TransactionService.deleteTransaction(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new TransactionController