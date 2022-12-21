const {user : User} = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.createUser = async (userParams) => {
    const user = new User({ ...userParams });
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    user.createdAt = new Date();
    return await user.save();
};
