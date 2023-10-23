const userModel = require("../../db/model/userSchema");
const bcrypt = require("bcryptjs");
const employeeController = {
  async getEmployee(req, res) {
    const empData = await userModel
      .find({ role: "employee" })
      .select("-__v -createdAt -updatedAt -role -date -password");
    return res.json({
      status: 200,
      employeeData: empData,
    });
  },
  async postEmployee(req, res) {
    const { name, email, password, address, mobile } = req.body;
    try {
      const user = await userModel.exists({ email: email });
      if (user) {
        return res.json({
          status: 403,
          message: "user already exists",
        });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const aId = await userModel.find().sort({ srNo: -1 });
      const userData = new userModel({
        srNo: aId[0].srNo + 1,
        name,
        email,
        password: hashPassword,
        address,
        mobile,
      });
      await userData.save();
      return res.status(201).json({
        status: 201,
        message: "user created successfully",
        userData: userData,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  },
  async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      await userModel.updateOne({ srNo: id }, req.body);
      return res.json({
        status: "success",
        message: "user has been updated successfully",
      });
    } catch (err) {
      res.json({
        status: 400,
        err: err.message,
      });
    }
  },
  async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      await userModel.deleteOne({ srNo: id }, req.body);
      return res.json({
        status: "success",
        message: "user deleted successfully",
      });
    } catch (err) {
      res.json({
        status: 400,
        err: err.message,
      });
    }
  },
};

module.exports = employeeController;
