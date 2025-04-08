const { User } = require("../models/index.js");
const { compareHashWithPassword } = require("../helpers/bcrypt.js");
const { convertPayloadToToken } = require("../helpers/jwt.js");

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class UserController {
	// Gunakan sebagai handler, terima 3 parameter
	// req, res, dan next
	static async postRegisterUserHandler(req, res, next) {
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
			// Error handling lempar ke next via parameter
			next(err);
		}
	}

	// Gunakan sebagai handler, terima 3 parameter
	// req, res, dan next
	static async postLoginUserHandler(req, res, next) {
		const { username, password } = req.body;

		try {
			const user = await User.findOne({
				where: {
					username,
				},
			});

			if (!user) {
				// Cukup throw error dan handle di error handler (app.js)
				throw new Error("INVALID_LOGIN");
			}

			if (!compareHashWithPassword(user.password, password)) {
				// Cukup throw error dan handle di error handler (app.js)
				throw new Error("INVALID_LOGIN");
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
			// Error handling lempar ke next via parameter
			next(err);
		}
	}
}

module.exports = UserController;
