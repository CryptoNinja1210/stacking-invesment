const { body, validationResult } = require('express-validator');

exports.createUserSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .isLength({max: 50 })
        .withMessage('Email should contain less than 50 characters')
        .normalizeEmail(),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('emailverify')
        .exists()
        .withMessage('Email verification code is required')
        .isNumeric()
        .withMessage('Email verification code must contain numeric characters')
        .isLength({min: 4 })
        .withMessage('Invite code should contain 4 characters')
        .isLength({max: 4 })
        .withMessage('Invite code should contain 4 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.updateUserSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .isLength({max: 50 })
        .withMessage('Invite code should contain 50 characters')
        .normalizeEmail(),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.updatePasswordSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .isLength({max: 50 })
        .withMessage('Invite code should contain 50 characters')
        .normalizeEmail(),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password can not be empty')
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .isLength({max: 50 })
        .withMessage('Invite code should contain 50 characters')
        .normalizeEmail(),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters'),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];

exports.validateEmail = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .isLength({max: 50 })
        .withMessage('Invite code should contain 50 characters')
        .normalizeEmail(),
        function(req,res,next) { 
            var errorValidation = validationResult(req);
            if ( errorValidation.errors.length !== 0 ) {
                return res.send({response:false, message:errorValidation.errors[0].msg})
            }
            next()
        },
];