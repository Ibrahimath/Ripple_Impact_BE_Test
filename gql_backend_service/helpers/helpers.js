import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve({ hash, salt });
      });
    });
  });
};

export const comparePassword = async (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    let result = bcrypt.compare(password, hashPassword);
    if (result) {
      resolve(result);
    } else {
      reject(err);
    }
  });
};
