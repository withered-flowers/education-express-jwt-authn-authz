const { Smartphone } = require("../models/index.js");

class SmartphoneController {
  static async getRootSmartphoneHandler(req, res, next) {
    // Kita bisa coba mengecek apakah ada data tambahan dari si authentication
    // (req.dataTambahan)
    console.log("data tambahan", req.dataTambahan);

    try {
      const smartphones = await Smartphone.findAll({
        attributes: ["id", "name"],
      });

      res.status(200).json({
        statusCode: 200,
        data: smartphones,
      });
    } catch (err) {
      next(err);
    }
  }

  static async postRootSmartphoneHandler(req, res, next) {
    try {
      const { name, price, qty, UserId } = req.body;

      const smartphone = await Smartphone.create({
        name,
        price,
        qty,
        UserId,
      });

      res.status(201).json({
        statusCode: 201,
        data: smartphone,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getSmartphoneDetailHandler(req, res) {
    try {
      const { smartphoneId } = req.params;

      const smartphone = await Smartphone.findOne({
        where: { id: smartphoneId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json({
        statusCode: 200,
        data: smartphone,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SmartphoneController;
