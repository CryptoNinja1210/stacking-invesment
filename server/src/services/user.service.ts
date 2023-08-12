const UserModel = require('../models/user.model.ts');
const EmailVerifyModel = require('../models/emailVerify.model.ts');
const HttpException = require('../utils/HttpException.utils.ts');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Role = require('../utils/userRoles.utils.ts');
const EmailType = require('../utils/emailType.utils.ts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { raw } = require('sqlstring');
const emailService = require('./emailer.service.ts');
const NotificationService = require('./notification.service.ts');
const i18n = require('i18n')
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

class UserService {
    static sendEmail(email, uniqueString, emailType) {
        var transport = nodemailer.createTransport({
            //service: process.env.EMAIL_SERVICE,
            host: EMAIL_HOST,
            port: Number(EMAIL_PORT),
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PWD
            }
        });
        var mailOptions = {}
        if (emailType === EmailType.EmailVerify) {
            mailOptions = {
                from: EMAIL,
                to: email,
                subject: 'Email Verification',
                text: 'Your Email verification code is : ' + uniqueString + '. Send this with your information.'
            };
        } else if (emailType === EmailType.ResetPassword) {
            mailOptions = {
                from: EMAIL,
                to: email,
                subject: 'Reset Password',
                text: 'Did you forget your password? To reset your password please visit here : ' + uniqueString
            };
        }

        transport.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    static makeRandomString(length) {
        let result = "";
        let characters = "0123456789";
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result
    }

    static async verifyEmail(email, locale) {
        if (!this.emailValidation(email)) {
            return {response: false, message: "Email validation failed.", data:null}
        }
        let verificationCode = this.makeRandomString(4);

        const subject = "MetaTron: Email Verification";
        const body = `Your Email verification code is ${verificationCode} `;
       
        emailService.deliverEmail(email, subject, body)
        
        let prev = await EmailVerifyModel.findOne({email:email});
        if (prev) {
            let result = await EmailVerifyModel.update({verifycode:verificationCode}, prev.id);
            if (!result) {
                return {response: false, message: "An error was caused during the Email Verification Code generation.", data:null}
            }
            if (result.error) {
                return {response: false, message: result.error, data:null}
            }
        } else {
            let result = await EmailVerifyModel.create({email:email, verifycode:verificationCode})
            if (!result) {
                return {response: false, message: "An error was caused during the Email Verification Code generation.", data:null}
            }
            if (result.error) {
                return {response: false, message: result.error, data:null}
            }
        }
        console.log(verificationCode)
        return {response: true, message: `Success. Email Verification Code ${verificationCode} was send to your Email address.`, data:null}
    }

    static async getAllUsers() {
        let userList = await UserModel.find();
        if (userList.length === 0 && userList) {
            return {response:false, message:"Users not found", data:null}
        }
        console.log(userList);
        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        return {response: true, message:"Success", data:userList}
    }

    static async getUsers(sortBy, pageNumber, itemsPerPage) {
        if (sortBy !== "id" && sortBy !== "email") {
            return {response:false, message:"Sorting Error.", data:null};
        }
        let direction = sortBy === "id" ? "ASC" : "DESC" 
        let userList = await UserModel.find(sortBy, direction);
        let userData = userList.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
        return {response:true, message:"Success", data:{totalNumber:userList.length, users:userData}}
    }

    static async getUserById(userId) {
        const user = await UserModel.findOne({ id: userId });
        if (!user) {
            return {response: false, message:'User not found', data:null}
        }

        const { password, ...userWithoutPassword } = user;

        return {response: true, message:"Success", data:userWithoutPassword};
    };

    static getCurrentUser(currentUser) {
        console.log(currentUser)
        const { password, ...userWithoutPassword } = currentUser;

        return {response:true, message:"Success", data:userWithoutPassword};
    };

    static async createUser(rawData) {
        const check = this.checkValidation(rawData);
        if (!check) {
            return {response:false, message:"Send data validation error", data:null}
        }
        const user = await UserModel.findOne({email:rawData.email});
        if (user) {
            return {response:false, message:"Already registered user.", data:null}
        }
        rawData.password = await this.hashPassword(rawData.password);
        const result = await UserModel.create(rawData);

        if (!result) {
            return {response:false, message:"An error caused during creating new user", data:null}
        }
        if (result.error) {
            return {response:false, message:result.error, data:null}
        }
        return {response:true, message:"Success", data:null}
    };

    static async updateUser(rawData) {
        const user = await UserModel.findOne({id:rawData.id});
        if (!user) {
            return {response:false, message:"Unregistered User.", data:null};
        }
        if (user.email !== rawData.email) {
            return {response:false, message:"Email address is wrong.", data:null};
        }
        if (rawData.currentpassword) {
            let isMatch = await bcrypt.compare(rawData.currentpassword, user.password);
            if (!isMatch) {
                return {response:false, message:'Current password is incorrect', data:null};
            }
            let password = await this.hashPassword(rawData.password);
            const result = await UserModel.update({id : rawData.id,password:password, firstname : rawData.firstname, lastname : rawData.lastname});
            
            if (!result) {
                return {response:false, message:"An error caused during updating your password.", data:null}
            }
            if (result.error) {
                return {response:false, message:result.error, data:null}
            }

            
            return { response:true, message:"Successfully updated", data:null };
        }
    };

    static async updatePassword(rawData) {
        const user = await UserModel.findOne({id:rawData.userid});
        if (!user) {
            return {response:false, message:"Unregistered User.", data:null};
        }
        if (user.email !== rawData.email) {
            return {response:false, message:"Email address is wrong.", data:null};
        }
        if (rawData.currentpassword) {
            let isMatch = await bcrypt.compare(rawData.currentpassword, user.password);
            if (!isMatch) {
                return {response:false, message:'Current password is incorrect', data:null};
            }
            rawData.password = await this.hashPassword(rawData.password);
            const result = await UserModel.update({userid : rawData.userid,password:rawData.password, firstname : rawData.firstname, lastname : rawData.lastname});
        
            if (!result) {
                return {response:false, message:"An error caused during updating your password.", data:null}
            }
            if (result.error) {
                return {response:false, message:result.error, data:null}
            }
        } else {
            rawData.password = await this.hashPassword(rawData.password);
            const result = await UserModel.update({userid : rawData.userid,password:rawData.password});
        
            if (!result) {
                return {response:false, message:"An error caused during updating your password.", data:null}
            }
            if (result.error) {
                return {response:false, message:result.error, data:null}
            }
        }

        return { response:true, message:"Successfully updated", data:null };
    }

    static async deleteUser(userId) {
        if (userId === 1) {
            return {response:false, message:"Cannot delete admin user.", data:null}
        }
        const result = await UserModel.delete({id: userId});
        if (!result) {
            return {response:false, message:"The user does not exist.", data:null}
        }
        if (result.error) {
            return {response:false, message:result.error, data:null}
        }

        return {response:true, message:"Successfully deleted.", data:null}
    };

    static async signUp(rawData) {
        const check = this.checkValidation(rawData);
        if (!check) {
            return {response:false, message:"Send data validation error", data:null}
        }
        rawData.password = await this.hashPassword(rawData.password);
        let checker = await UserModel.findOne({email:rawData.email});
        if (checker) {
            return {response:false, message:"This Email already in use", data:null}
        }
        //check email verification
        let verifier = await EmailVerifyModel.findOne({email:rawData.email});
        
        if (!verifier) {
            return {response:false, message:"Please receive and resend the Email verification code.", data:null}
        }
        if (verifier.verifycode !== rawData.emailverify) {
            return {response:false, message:"Email verification code is wrong.", data:null}
        }
       
        // user register
        rawData.role = Role.General;
        const {  emailverify, ...registerData } = rawData;
        const result = await UserModel.create(registerData);
        
        if (!result) {
            return {response:false, message:"An error was caused during user registeration.", data:null}
        }
        if (result.error) {
            return {response:false, message:result.error, data:null}
        }
        const welcomeMessage = `Welcome to the MetaTron dashboard. Here you will find your earnings, deposit, and withdrawal details. To see the statistics, ensure you have selected the correct wallet on TronLink Pro. Logout and log back in if you change wallet. Enjoy the profits!`;
        await NotificationService.createNotification({userid:result.insertId,message:welcomeMessage});

        
        const subject = i18n.__({phrase: "MetaTron : Account Created Sucessfully", locale: rawData.locale || "En"})
        const body = i18n.__({phrase: "Your MetaTron account has been created sucessfully. Thank you.", locale: rawData.locale || "En"});
        emailService.deliverEmail(rawData.email, subject, body);
        
        return {response:true, message:"Success", data:null}
    };

    static async userLogin(rawData) {
        const check = this.checkValidation(rawData);
        if (!check) {
            return {response:false, message:"Send data validation error", data:null}
        }
        let { email, password:pass} = rawData;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return {response: false, message:"Unregistered user!", data:null}
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            return {response:false, message:'Incorrect password!', data:null}
        }
        
        
        // user matched!
        const secretKey = SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...userInfo } = user;
        return {response:true, message:"Success!", data: { userInfo, token}}
    };

    static async forgotPassword(rawData) {
        if (!this.emailValidation(rawData.email)) {
            return {response:false, message:"Email validation failed.", data:null};
        }
        const user = await UserModel.findOne({email:rawData.email});
        if (!user) {
            return {response:false, message:"Unregistered user.", data:false};
        }
        const secretKey = SECRET_JWT || "";
        const token = jwt.sign({user_id:user.id.toString()}, secretKey, {
            expiresIn: '2h'
        });
        const link = `${FRONT_URL}resetpassword/${token}`;
        console.log(link)

        const subject = i18n.__({phrase: "MetaTron - Password Reset", locale: rawData.locale || "En"})
        const body = i18n.__({phrase: "To reset your password, please click on this link: %s", locale: rawData.locale || "En"}, link);
        emailService.deliverEmail(user.email, subject, body);

        return {response:true, message:"Success. Please check your Email inbox.", data:null};
    }

    static checkValidation(data) {
        const errors = validationResult(data)
        if (!errors.isEmpty()) {
            return false
        }
        return true
    }

    // hash password if it exists
    static async hashPassword(password) {
        if (password) {
            password = await bcrypt.hash(password, 8);
            return password
        }
    }

    
    static emailValidation(enteredEmail){
        var mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(enteredEmail.match(mail_format))
        {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = UserService