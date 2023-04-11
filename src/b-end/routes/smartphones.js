const express = require("express");
const router = express.Router();
const smartphoneController = require("../controllers/smartphone-controller.js");

// GET /smartphones/
router.get("/", smartphoneController.getRootSmartphoneHandler);

// POST /smartphones/
router.post("/", smartphoneController.postRootSmartphoneHandler);

// GET /smarphones/:smartphoneId
// Ceritanya sekarang di sini kita membutuhkan akses (Authorization)
// Ketika tidak user dari smartphone yang ditemukan tidak sama dengan
// user yang sedang login
// Maka tidak boleh akses !
const { Smartphone } = require("../models/index.js");
router.get(
  // Endpoint
  "/:smartphoneId",
  // Handler (Authorization) - Sengaja dibuat dengan function biasa
  // umumnya dibuat arrow function saja
  async function logicUntukAuthorization(req, res, next) {
    try {
      const { smartphoneId } = req.params;

      // Kita ambil dari data tambahan
      const userId = req.dataTambahan.id;

      // Validasi
      const foundSmartphone = await Smartphone.findByPk(smartphoneId);

      if (!foundSmartphone) {
        // Throw 404 karena smartphone tidak ditemukan
      }

      // Logic Authorization
      if (foundSmartphone.UserId !== userId) {
        // Forbidden
        throw new Error("FORBIDDEN");
      }

      // Kalau bisa... S-L-E-D-I-N-G ke bawah
      next();
    } catch (err) {
      next(err);
    }
  },
  // Handler (Endpoint Handler)
  smartphoneController.getSmartphoneDetailHandler
);

module.exports = router;
