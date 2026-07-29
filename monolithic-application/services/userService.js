const { catchAsync } = require("../utils/errorHandler");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const saltRounds = Number(process.env.SALT_ROUNDS)


const userService = {
    signup: async (body) => {
        const {email, password, phone} = body;

        const preUser = await User.findOne({email: email.toLowerCase()});

        if(preUser){
            throw new Error("User already exists");
        }
        
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword =  await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            phone
        });

        return {
            success:true,
            message: 'User created successfully'
        }
    }
}

module.exports = userService;