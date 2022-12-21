const jwt = require('jsonwebtoken');
const JWT_SECRET = '8b8cda03b2fb16506c66ecfcfc6bc8ad7ebb8a9e11e5df0a74343c8bf7e5c86b3670d25238d2b451c734f6d641398d57f79a7127123b810baa9fa87f3fc1bdfc'


/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.tokenVerification = async (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      const isValidateToken = jwt.verify(token, JWT_SECRET);
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
