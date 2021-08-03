const { User, Movie } = require("../models/index.js");

class Controller {
  static async getMoviesHandler(req, res) {
    try {
      const movies = await Movie.findAll();
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = Controller;
