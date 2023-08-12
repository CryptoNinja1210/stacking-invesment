const WithdrawInfoModel = require("../models/withdrawInfo.model.ts");
const { validationResult } = require('express-validator');
const { getCurrentDate } = require("../utils/clock.ts");
class WithdrawInfoService {
    constructor() {

    }

    static async createWithdrawInfo(rawData) {
        try {
            if (!rawData.userid) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let currentDate = getCurrentDate();
            let result = await WithdrawInfoModel.create({userid:rawData.userid, date:currentDate, amount : rawData.amount});
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response: true, message:"Success!", data: null}
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async updateWithdrawInfo(rawData, Id) {
        try {
            let withdrawInfo = await WithdrawInfoModel.findOne({id:Id});
            if (!withdrawInfo) {
                return {response: false, message:"That withdrawInfo does not exist.", data: null}
            }
            if (!rawData.userid) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let result = await WithdrawInfoModel.update({userid:rawData.userid, date:getCurrentDate}, Id);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response:true, message:"Success", data:null};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getAllWithdrawInfo() {
        try {
            let result = await WithdrawInfoModel.find();
            if (result.length === 0) {
                return {response: false, message:"There is no registered withdrawInfo.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getWithdrawInfoByUserId(userId) {
        try {
            let result = await WithdrawInfoModel.find({userid : userId});
            if (result.length === 0) {
                return {response: false, message:"no WithdrawInfo.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getOneWithdrawInfo(Id) {
        try {
            let result = await WithdrawInfoModel.findOne({id:Id});
            if (!result) {
                return {response: false, message:"That withdrawInfo does not exist.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }
    static async getLatestWithdrawInfo(sortBy='id', pageNumber=1, itemsPerPage=10) {
        if (sortBy !== "id") {
            return {response:false, message:"Sorting Error.", data:null};
        }
        let direction = sortBy === "id" ? "DESC" : "ASC";  
        let userList = await WithdrawInfoModel.findBySort(`${sortBy} ${direction}`);
        
        let userData = userList.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
        return {response:true, message:"Success", data:{totalNumber:userList.length, users:userData}}
    }

    static async deleteWithdrawInfo(Id) {
        try {
            let result = await WithdrawInfoModel.delete({id:Id});
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            if (result) {
                return {response: true, message:"Success", data:null};
            } else {
                return {response: false, message:"That withdrawInfo does not exist.", data:null};
            }
        } catch (error) {
            return {response:false, message:error.message, data:null};
        }
    }
}

module.exports = WithdrawInfoService