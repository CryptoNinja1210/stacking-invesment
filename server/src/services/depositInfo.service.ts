const DepositInfoModel = require("../models/depositInfo.model.ts");
const { validationResult } = require('express-validator');
const { getCurrentDate } = require("../utils/clock.ts");
class DepositInfoService {
    constructor() {

    }
    
    static async createDepositInfo(rawData) {
        try {
            if (!rawData.userid) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let currentDate = getCurrentDate();
            let result = await DepositInfoModel.create({userid:rawData.userid, date:currentDate, amount : rawData.amount});
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response: true, message:"Success!", data: null}
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async updateDepositInfo(rawData, Id) {
        try {
            let depositInfo = await DepositInfoModel.findOne({id:Id});
            if (!depositInfo) {
                return {response: false, message:"That depositInfo does not exist.", data: null}
            }
            if (!rawData.userid) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let result = await DepositInfoModel.update({userid:rawData.userid, date:getCurrentDate}, Id);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response:true, message:"Success", data:null};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getAllDepositInfo() {
        try {
            let result = await DepositInfoModel.find();
            if (result.length === 0) {
                return {response: false, message:"There is no registered depositInfo.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }
    static async getDepositInfoByUserId(userId) {
        try {
            let result = await DepositInfoModel.find({userid : userId});
            if (result.length === 0) {
                return {response: false, message:"no depositInfo.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getOneDepositInfo(Id) {
        try {
            let result = await DepositInfoModel.findOne({id:Id});
            if (!result) {
                return {response: false, message:"That deposit does not exist.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async getLatestDepositInfo(sortBy='id', pageNumber=1, itemsPerPage=10) {
        if (sortBy !== "id") {
            return {response:false, message:"Sorting Error.", data:null};
        }
        let direction = sortBy === "id" ? "DESC" : "ASC";  
        let userList = await DepositInfoModel.findBySort(`${sortBy} ${direction}`);
        
        let userData = userList.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
        return {response:true, message:"Success", data:{totalNumber:userList.length, users:userData}}
    }
    static async deleteDepositInfo(Id) {
        try {
            let result = await DepositInfoModel.delete({id:Id});
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            if (result) {
                return {response: true, message:"Success", data:null};
            } else {
                return {response: false, message:"That depositnfo does not exist.", data:null};
            }
        } catch (error) {
            return {response:false, message:error.message, data:null};
        }
    }
}

module.exports = DepositInfoService