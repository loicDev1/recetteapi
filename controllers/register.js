
const {getMongoDbConnection} = require('../utils/getMongoDbConnection');
const {registrationDataVerification} = require('../utils/registrationDataVerification') ;
const {createUser} =  require('../utils/createUser') ;

module.exports.register = async (req, res) => {
  try {
    const user = req.body
      await Promise.all([
        await getMongoDbConnection(),
        await registrationDataVerification(user),
        await createUser(user),
      ]);
      await res.status(200).json({ message: 'users successfull created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
