const leaveModel = require("../../db/model/leaveSchema");
const leaveController = {
  async postLeave(req, res) {
    const { startDate, endDate, reason } = req.body;
    const leaveData = new leaveModel({
      userId: req.user.id,
      startDate,
      endDate,
      reason,
    });
    await leaveData.save();
    return res.json({
      status: 201,
      message: "requested leave is added successfully",
    });
  },
  async getLeave(req, res) {
    await leaveModel
      .find()
      .populate({ path: "userId" })
      .then((leaveData) => {
        return res.json({
          status: 200,
          leaveData: leaveData,
        });
      })
      .catch((err) => {
        return res.json({
          status: 400,
          err: err.message,
        });
      });
  },
  async getOneLeave(req, res) {
    const { id } = req.params;
    await leaveModel
      .findOne({ _id: id })
      .populate({ path: "userId" })
      .then((leaveData) => {
        return res.json({
          status: 200,
          leaveData: leaveData,
        });
      })
      .catch((err) => {
        return res.json({
          status: 400,
          err: err.message,
        });
      });
  },
  async manageReqLeave(req, res) {
    try {
      const { id } = req.params;
      const { approvalStatus } = req.body;
      await leaveModel.updateOne(
        { _id: id },
        { approvalStatus: approvalStatus }
      );
      return res.json({
        status: "success",
        message: "leave was updated successfully",
      });
    } catch (err) {
      return res.json({
        status: 400,
        err: err.message,
      });
    }
  },
  async manageLeave(req, res) {
    const { startDate, endDate, reason } = req.body;
    try {
      const leaveData = new leaveModel({
        userId: req.user.id,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        reason,
        approvalStatus: "approved",
      });
      await leaveData.save();
      return res.json({
        status: 201,
        message: "Leave added successfully",
      });
    } catch (err) {
      return res.json({
        status: 400,
        err: err.message,
      });
    }
  },
  async upadateLeave(req, res) {
    const { id } = req.params;
    try {
      await leaveModel.updateOne({ _id: id }, req.body);
      return res.json({
        status: 200,
        message: "Leave updated successfully",
      });
    } catch (err) {
      return res.json({
        status: 400,
        err: err.message,
      });
    }
  },
  async deleteLeave(req, res) {
    try {
      const { id } = req.params;
      await leaveModel.deleteOne({ _id: id });
      return res.json({
        status: 200,
        message: "Leave deleted successfully",
      });
    } catch (err) {
      return res.json({
        status: 400,
        err: err.message,
      });
    }
  },
};

module.exports = leaveController;
