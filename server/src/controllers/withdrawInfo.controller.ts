const WithdrawInfoService = require("../services/withdrawInfo.service.ts");

class WithdrawInfoController {
    createWithdrawInfo = async (req, res, next) => {
        try {
            const result = await WithdrawInfoService.createWithdrawInfo(req.body);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    updateWithdrawInfo = async (req, res, next) => {
        try {
            const result = await WithdrawInfoService.updateWithdrawInfo(req.body, req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAllWithdrawInfo = async (req, res, next) => {
        try {
            const result = await WithdrawInfoService.getAllWithdrawInfo();
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getWithdrawInfoByUserId = async (req, res, next) => {
        try {
            const result = await WithdrawInfoService.getWithdrawInfoByUserId(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getOneWithdrawInfo = async (req, res, next) => {
        try {
            const result = await WithdrawInfoService.getOneWithdrawInfo(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
    getLatestWithdrawInfo = async (req, res, next) => {

        try {
            const result = await WithdrawInfoService.getLatestWithdrawInfo( req.body.sortby, req.body.page, req.body.items);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    deleteWithdrawInfo = async (req, res, next) => {
        try {
            const result = await WithdrawInfoService.deleteWithdrawInfo(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new WithdrawInfoController