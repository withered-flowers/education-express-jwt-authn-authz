const express = require("express");
const router = express.Router();
const smartphoneController = require("../controllers/smartphone-controller.js");

router.get("/", smartphoneController.getRootSmartphoneHandler);
router.post("/", smartphoneController.postRootSmartphoneHandler);

module.exports = router;
