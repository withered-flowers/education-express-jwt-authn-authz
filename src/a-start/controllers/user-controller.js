const { User } = require("../models/index.js");
const { compareHashWithPassword } = require("../helpers/bcrypt.js");
const { convertPayloadToToken } = require("../helpers/jwt.js");

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
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
				res.status(401).json({
					statusCode: 401,
					error: "Invalid username or password",
				});
			}

			if (!compareHashWithPassword(user.password, password)) {
				res.status(401).json({
					statusCode: 401,
					error: "Invalid username or password",
				});
			}

			// kita ingin mengembalikan accessToken ke client
			// jadi kita harus membuat payloadnya terlebih dahulu
			// kemudian membuat payload jadi token
			const payload = {
				// isikan payload dengan data seperlunya saja
				// jangan berisi data yang terlalu sensitif (bila memungkinkan)
				id: user.id,
			};

			const accessToken = convertPayloadToToken(payload);

			res.status(200).json({
				// berikan ke client
				access_token: accessToken,
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
