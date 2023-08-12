const NotificationService = require("../services/notification.service.ts");

class NotificaionController {
    createNotificaion = async (req, res, next) => {
        try {
            const result = await NotificationService.createNotification(req.body);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    updateNotificaion = async (req, res, next) => {
        try {
            const result = await NotificationService.updateNotification(req.body, req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getAllNotificaion = async (req, res, next) => {
        try {
            const result = await NotificationService.getAllNotification();
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getNotificationByUserId = async (req, res, next) => {
        try {
            const result = await NotificationService.getNotificationByUserId(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    getOneNotificaion = async (req, res, next) => {
        try {
            const result = await NotificationService.getOneNotification(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    deleteNotificaion = async (req, res, next) => {
        try {
            const result = await NotificationService.deleteNotification(req.params.id);
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new NotificaionController