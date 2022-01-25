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

app.listen(port, () => console.log(`Aplikasi berjalan pada port ${port}!`));
