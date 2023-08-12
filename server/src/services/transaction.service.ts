const TransactionModel = require("../models/transaction.model.ts");
const { validationResult } = require('express-validator');
const { getCurrentDate } = require("../utils/clock.ts");
class TransactionService {
    constructor() {

    }
    
    static async createTransaction(rawData) {
        try {
            if (!rawData.userid || !rawData.message || !rawData.transaction) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let result = await TransactionModel.create(rawData);
            console.log(result);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response: true, message:"Success!", data: null}
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async updateTransaction(rawData, Id) {
        try {
            let depositInfo = await TransactionModel.findOne({id:Id});
            if (!depositInfo) {
                return {response: false, message:"That depositInfo does not exist.", data: null}
            }
            if (!rawData.userid) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let result = await DepositInfoModel.update(rawData, Id);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response:true, message:"Success", data:null};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getAllTransaction() {
        try {
            let result = await TransactionModel.find();
            if (result.length === 0) {
                return {response: false, message:"There is no registered depositInfo.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }
    static async getTransactionByUserId(userId) {
        try {
            let result = await TransactionModel.find({userid : userId});
            if (result.length === 0) {
                return {response: false, message:"no depositInfo.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getOneTransaction(Id) {
        try {
            let result = await TransactionModel.findOne({id:Id});
            if (!result) {
                return {response: false, message:"That deposit does not exist.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async getLatestTransaction(sortBy='id', pageNumber=1, itemsPerPage=10) {
        if (sortBy !== "id") {
            return {response:false, message:"Sorting Error.", data:null};
        }
        let direction = sortBy === "id" ? "DESC" : "ASC";  
        let userList = await TransactionModel.findBySort(`${sortBy} ${direction}`);
        
        let userData = userList.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
        return {response:true, message:"Success", data:{totalNumber:userList.length, users:userData}}
    }
    static async deleteTransaction(Id) {
        try {
            let result = await TransactionModel.delete({id:Id});
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

module.exports = TransactionService