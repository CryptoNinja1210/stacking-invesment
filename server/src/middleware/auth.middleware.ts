const HttpException = require('../utils/HttpException.utils.ts');
const UserModel = require('../models/user.model.ts');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {
    BNB_ADDRESS,
    COIN_AMOUNT,
    ADMIN_GAS_PRICE,
    ADMIN_GAS_LIMIT,
    HOST,
    DB_USER,
    DB_PASS,
    DB_DATABASE,
    PORT,
    SECRET_JWT,
    EMAIL_HOST,
    EMAIL_SERVICE,
    EMAIL,
    EMAIL_PWD,
    FRONT_URL,
    COINMARKET_APIKEY
}= require('../utils/constants');
dotenv.config();

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';
            if (!authHeader || !authHeader.startsWith(bearer)) {
                res.send({response:false, message:'Access denied. No credentials sent!', data:null})
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = SECRET_JWT || "";

            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            const user = await UserModel.findOne({ id: decoded.user_id });
            if (!user) {
                res.send({response:false, message:'Authentication failed!', data:null})
            }

            // check if the current user is the owner user
            const ownerAuthorized = req.params.id == user.id;
            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            if (!ownerAuthorized && roles.length && !roles.includes(user.role)) {
                res.send({response:false, message:'Unauthorized', data:null})
            }

            // if the user has permissions
            req.currentUser = user;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = auth;