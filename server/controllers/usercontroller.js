const User = require('../models/User');
const bcrypt = require("bcrypt");

exports.register = async(data) => {
    const hash = await bcrypt.hash(data.password, 10)
    const user = new User({
        login: data.login,
        hash: hash
    })
    try {
        const savedUser = await user.save();
        return savedUser;
    }
    catch (err) {
        return null;
    }
}

exports.login = async(data) => {
    try {
        const user = await User.findOne({ login: data.login})
        if (!user) return null
        if (await bcrypt.compare(data.password, user.hash)) return user
        else return { login: data.login, hash: null }
    }
    catch(err) {
        return null
    }
}