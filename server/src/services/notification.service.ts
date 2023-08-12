const NotificationModel = require("../models/notification.model.ts");
const { validationResult } = require('express-validator');
class NotificationService {
    constructor() {

    }

    static async createNotification(rawData) {
        try {
            if (!rawData.userid || !rawData.message) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let result = await NotificationModel.create(rawData);
            console.log(result);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response: true, message:"Success!", data: null}
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async updateNotification(rawData, Id) {
        try {
            let notification = await NotificationModel.findOne({id:Id});
            if (!notification) {
                return {response: false, message:"That notification does not exist.", data: null}
            }
            if (!rawData.userid || !rawData.message) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let result = await NotificationModel.update(rawData, Id);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response:true, message:"Success", data:null};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getAllNotification() {
        try {
            let result = await NotificationModel.find();
            if (result.length === 0) {
                return {response: false, message:"There is no registered notification.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getNotificationByUserId(userId) {
        try {
            let result = await NotificationModel.find({userid : userId});
            if (result.length === 0) {
                return {response: false, message:"no depositInfo.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getOneNotification(Id) {
        try {
            let result = await NotificationModel.findOne({id:Id});
            if (!result) {
                return {response: false, message:"That notification does not exist.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async deleteNotification(Id) {
        try {
            let result = await NotificationModel.delete({id:Id});
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            if (result) {
                return {response: true, message:"Success", data:null};
            } else {
                return {response: false, message:"That notification does not exist.", data:null};
            }
        } catch (error) {
            return {response:false, message:error.message, data:null};
        }
    }
}

module.exports = NotificationService