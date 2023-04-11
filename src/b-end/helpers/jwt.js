const jwt = require("jsonwebtoken");
const secretKey = "ini_sangat_tidak_aman_sekali";

const convertPayloadToToken = (payload) => {
  return jwt.sign(payload, secretKey, {
    // Ketika membuat JWT,
    // jangan lupa untuk memberikan waktu expired
    expiresIn: "1h",
  });
};

const convertTokenToPayload = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  convertPayloadToToken,
  convertTokenToPayload,
};
