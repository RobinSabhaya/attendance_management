const userModel = require("../db/model/userSchema");
const bcrypt = require("bcryptjs");
const registerController = {
  async getRegister(req, res) {
    try {
      const userData = await userModel.find();
      return res.status(200).json({
        status: 200,
        userData: userData,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  },

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const userData = await userModel.findOne({ _id: id });
      return res.json({
        status: 200,
        userData: userData,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  },
};

module.exports = registerController;
