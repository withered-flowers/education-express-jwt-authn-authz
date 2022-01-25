"use strict";
const { Model } = require("sequelize");
const { createHash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Smartphone);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // Menggunakan hooks beforeCreate untuk menghash password
  User.addHook("beforeCreate", (user) => {
    user.password = createHash(user.password);
  });

  return User;
};
