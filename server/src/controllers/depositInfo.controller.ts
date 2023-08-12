const DepositInfoService = require("../services/depositInfo.service.ts");

class DepositInfoController {
    createDepositInfo = async (req, res, next) => {
        try {
            const result = await DepositInfoService.createDepositInfo(req.body);
            res.send(result)
            
        } catch (error) {
            next(error)
        }
    }

    updateDepositInfo = async (req, res, next) => {
        try {
            const result = await DepositInfoService.updateDepositInfo(req.body, req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAllDepositInfo = async (req, res, next) => {
        try {
            const result = await DepositInfoService.getAllDepositInfo();
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getDepositInfoByUserId = async (req, res, next) => {
        try {
            const result = await DepositInfoService.getDepositInfoByUserId(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getOneDepositInfo = async (req, res, next) => {
        try {
            const result = await DepositInfoService.getOneDepositInfo(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
    getLatestDepositInfo = async (req, res, next) => {

        try {
            const result = await DepositInfoService.getLatestDepositInfo( req.body.sortby, req.body.page, req.body.items);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
    deleteDepositInfo = async (req, res, next) => {
        try {
            const result = await DepositInfoService.deleteNotification(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new DepositInfoController