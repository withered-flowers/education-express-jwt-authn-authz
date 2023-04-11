// di pembelajaran ini kita akan menggunakan bcrypt untuk
// melakukan hashing pada password yang akan diinputkan
const bcrypt = require("bcrypt");

// fungsi ini untuk membuat hash dari password
const createHash = (password) => {
  return bcrypt.hashSync(password, 10);
};

// fungsi ini untuk membandingkan password yang diinputkan dengan
// password yang ada di database
const compareHashWithPassword = (hash, password) => {
  return bcrypt.compareSync(password, hash);
};

// export supaya dapat digunakan di tempat lain
module.exports = {
  createHash,
  compareHashWithPassword,
};
