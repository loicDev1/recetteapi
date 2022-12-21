const jwt = require('jsonwebtoken');
const {user : User} = require('../models/user');
const bcrypt = require('bcrypt');

const generateTokenForUser = (user) => {
  const { password, ...rest } = user;
  return jwt.sign({...rest._doc }, process.env.JWT_SECRET, {
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
