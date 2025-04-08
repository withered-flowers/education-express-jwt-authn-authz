// Diperlukan untuk cross-server
const cors = require("cors");

const express = require("express");
const routes = require("./routes/index.js");

const app = express();
const port = 3000;

// menggunakan modul cors
app.use(cors());
// menggunakan bodyParser untuk bisa memproses x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// menggunakan jsonParser untuk bisa memproses json
app.use(express.json());

// menggunakan routes dari routes/index.js
app.use(routes);

// menggunakan error handler (ada baiknya fungsi ini masuk ke middlewares/error.js)
app.use(
	// Middleware, terima 4 parameter = Express Default Error Handler
	(err, req, res, next) => {
		// Handle error di sini
		let code = 500;
		let msg = "Internal Server Error";

		console.log(err);

		if (err.message === "INVALID_USERNAME_OR_PASSWORD") {
			code = 400;
			msg = "Invalid name / password";
		} else if (err.message === "INVALID_LOGIN") {
			code = 401;
			msg = "Invalid username or password";
		} else if (err.message === "UNAUTHENTICATED") {
			code = 401;
			msg = "Invalid token";
		} else if (err.message === "FORBIDDEN") {
			code = 403;
			msg = "Forbidden to Access";
		}

		// Kembalikan status code dan pesan error
		res.status(code).json({ error: msg });
	},
);

app.listen(port, () => console.log(`Aplikasi berjalan pada port ${port}!`));
