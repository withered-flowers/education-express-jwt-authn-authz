const express = require("express");
const router = express.Router();

const userRoutes = require("./users.js");
const smartphoneRoutes = require("./smartphones.js");

router.use("/users", userRoutes);

// Ceritanya di sini akan ada authentication,
// kalau tidak login, tidak boleh akses /smartphones

// Authentication = Middleware Express = Function
const { User } = require("../models/index.js");
const { convertTokenToPayload } = require("../helpers/jwt.js");
router.use(
	// Function
	async (req, res, next) => {
		try {
			// Terima token dari client, ambil dari header bernama "Authorization"
			const { authorization } = req.headers;

			// Valuenya adalah "Bearer value_dari_token", ada pemisah berupa spasi
			const token = authorization.split(" ")[1];

			// Kalau tidak ada = tidak boleh
			if (!token) {
				throw new Error("UNAUTHENTICATED");
			}

			// Jadikan payload
			const payload = convertTokenToPayload(token);

			// Validasi terlebih dahulu
			const foundUser = await User.findByPk(payload.id);

			if (!foundUser) {
				throw new Error("UNAUTHENTICATED");
			}

			// Berikan data tambahan
			req.dataTambahan = {
				id: foundUser.id,
				username: foundUser.username,
			};

			// Jangan lupa "sliding" ke bawah via next()
			next();
		} catch (err) {
			// Akan bersambung ke error handler express (app.js)
			next(err);
		}
	},
);

router.use("/smartphones", smartphoneRoutes);

module.exports = router;
