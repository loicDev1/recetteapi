const {getMongoDbConnection} = require('../utils/getMongoDbConnection');
const {loginDataVerification} = require('../utils/loginDataVerification') ;
const {authentification} =  require('../utils/authentification') ;

module.exports.login = async (req, res) => {
    try {
        const userData = req.body
        const result = await Promise.all([
            await getMongoDbConnection(),
            await loginDataVerification(userData),
            await authentification(userData),
        ]);
        const {password , ...user} = await result[result.length - 1];
        await res.status(200).json({ message: user });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
}