const userModel = require("../db/model/userSchema");
const loginModel = require("../db/model/loginSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;
const loginController = {
  async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.exists({ email: email });
      const loginUser = await userModel.findOne({ email: email });
      if (!user) {
        return res.json({
          status: 400,
          message: "User not found",
        });
      }
      const checkPassword = await bcrypt.compare(password, loginUser.password);
      if (checkPassword) {
        const accessToken = await jwt.sign(
          { id: loginUser._id, role: loginUser.role },
          JWT_SECRET
        );
        return res.json({
          status: 201,
          message: "login successful",
          loginUser: {
            id: loginUser._id,
            role: loginUser.role,
            email: loginUser.email,
          },
          accessToken: accessToken,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  },
  async getOneLogin(req, res) {
    const { id } = req.params;
    try {
      const user = await userModel
        .findOne({ _id: id })
        .select("role name email mobile address ");
      return res.json({
        status: 200,
        user: user,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  },
};

module.exports = loginController;
