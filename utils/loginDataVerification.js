const userKeys = ['email', 'password'];

module.exports.loginDataVerification = async (user) => {
  return new Promise((resolve, reject) => {
    const allBodyUserKeys = Object.keys(user);
    if (!Object.keys(user).length) {
      reject({ message: 'aucun parametre dans le corps de la requette' });
    } else if (allBodyUserKeys.filter((e) => !userKeys.includes(e)).length) {
      reject({
        message:
          'proprieté impossible a destructuré dans le corps de la requette',
      });
    } else {
      const { email, password } = user;
      if (!email || !password) {
        reject({ message: 'vous devez renseigner tout les champs' });
      }
    }
    resolve({ ...user });
  });
};
