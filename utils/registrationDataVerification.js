const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPassword = /^(?=.*\d).{5,12}$/;
const userKeys = ['pseudo', 'email', 'password'];

module.exports.registrationDataVerification = async (user) => {
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
      const { email, pseudo, password } = user;
      if (!email || !pseudo || !password) {
        reject({ message: 'vous devez renseigner tout les champs' });
      } else if (!regexEmail.test(email)) {
        reject({ message: 'adresse email invalide' });
      } else if (!regexPassword.test(password)) {
        reject({
          message:
            'votre mot de passe doit contenir 5-12 caracteres et inclure un nombre',
        });
      }
    }
    resolve({ ...user });
  });
};
