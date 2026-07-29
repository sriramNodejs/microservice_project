const { catchAsync } = require("../utils/errorHandler")

const userService = require('../services/userService');

const userController = {
    signup: catchAsync( async(req, res, next) => {
        const response = await userService.signup(req.body);
        res.status(201).json(response);
    })
}

module.exports = userController;