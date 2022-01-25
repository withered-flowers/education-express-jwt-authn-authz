const { User } = require("../models/index.js");
const { compareHashWithPassword } = require("../helpers/bcrypt.js");

class UserController {
  static async postRegisterUserHandler(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.create({
        username,
        password,
      });

      // Kode ini masih belum diproteksi dengan baik
      // masih menampilkan password, masih butuh diperbaiki yah !
      res.status(201).json({
        statusCode: 201,
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        error: err.message,
      });
    }
  }

  static async postLoginUserHandler(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          error: "Invalid username or password",
        });
      }

      if (!compareHashWithPassword(user.password, password)) {
        return res.status(401).json({
          statusCode: 401,
          error: "Invalid username or password",
        });
      }

      res.status(200).json({
        statusCode: 200,
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        error: err.message,
      });
    }
  }
}

module.exports = UserController;
