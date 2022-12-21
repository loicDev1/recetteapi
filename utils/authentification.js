const jwt = require('jsonwebtoken');
const {user : User} = require('../models/user');
const bcrypt = require('bcrypt');
const JWT_SECRET = '8b8cda03b2fb16506c66ecfcfc6bc8ad7ebb8a9e11e5df0a74343c8bf7e5c86b3670d25238d2b451c734f6d641398d57f79a7127123b810baa9fa87f3fc1bdfc'


const generateTokenForUser = (user) => {
  const { password, ...rest } = user;
  return jwt.sign({...rest._doc }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
*/

module.exports.authentification = async (userData) => {
  const { email, password } = userData;
  const findUser = await User.findOne({ email });
  if (findUser) {
    const match = await bcrypt.compare(password, findUser.password);
    if (match) {
      if (findUser.isBlocked) {
        throw new Error("Vous avez été bloqué par l'administrateur");
      } else {
        const token = generateTokenForUser(findUser);
        return { token , ...findUser._doc };
      }
    } else {
      throw new Error('Mot de passe incorrect');
    }
  } else {
    throw new Error('Aucun utilisateur pour cette adresse email');
  }
};
