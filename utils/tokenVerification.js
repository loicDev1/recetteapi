const jwt = require('jsonwebtoken');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.tokenVerification = async (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      const isValidateToken = jwt.verify(token, process.env.JWT_SECRET);
      if (isValidateToken) {
        resolve({ isValidateToken });
      } else {
        reject({ message: 'le token a expiré' });
      }
    } else {
      reject({ message: 'token invalide : permission refusé' });
    }
  });
};
