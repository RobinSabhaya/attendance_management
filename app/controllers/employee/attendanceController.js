const attendanceModel = require("../../db/model/attendanceSchema");
const dayjs = require("dayjs");
const attendanceController = {
  async getAttendance(req, res) {
    try {
      await attendanceModel
        .find()
        .select("workingDate _id session")
        .populate({ path: "userId", select: " srNo name" })
        .then((attendanceDatas) => {
          return res.json({
            status: 200,
            attendanceDatas: attendanceDatas,
          });
        });
    } catch (err) {
      return res.json({
        status: 400,
        err: err.message,
      });
    }
  },
  async getOneAttendance(req, res) {
    const { id } = req.params;
    try {
      await attendanceModel
        .findOne({ _id: id })
        .select("workingDate _id session")
        .populate({ path: "userId", select: " srNo name" })
        .then((attendanceData) => {
          return res.json({
            status: 200,
            attendanceData: attendanceData,
          });
        });
    } catch (err) {
      return res.json({
        status: 400,
        err: err.message,
      });
    }
  },
  async postAttendance(req, res) {
    try {
      const { session } = req.body;
      let inTime = session?.inTime;
      let outTime = session?.outTime;
      let AttendanceData = await attendanceModel
        .findOne({ userId: req.user.id })
        .sort({ createdAt: -1 });
      if (
        session.type &&
        new Date(AttendanceData.workingDate).toISOString().slice(0, 10) !==
          new Date().toISOString().slice(0, 10)
      ) {
        let attendanceData = new attendanceModel({
          userId: req.user.id,
          session: session,
        });
        await attendanceData.save();
      }
      if (
        inTime &&
        new Date(AttendanceData.workingDate).toISOString().slice(0, 10) ===
          new Date().toISOString().slice(0, 10)
      ) {
        let attendancedatas = await attendanceModel
          .findOne({
            userId: req.user.id,
          })
          .sort({ createdAt: -1 });
        attendancedatas.session.push(session);
        await attendancedatas.save();
      }

      if (outTime && session.workNote) {
        let attendancedata = await attendanceModel
          .findOne({
            userId: req.user.id,
            "session[session.length -1].outTime": null,
          })
          .sort({ createdAt: -1 });
        inTime =
          attendancedata.session[attendancedata.session.length - 1].inTime;
        attendancedata.session[attendancedata.session.length - 1].outTime =
          outTime;
        const totalWorkHour = dayjs(outTime).diff(inTime, "h");
        const totalWorkMinute = dayjs(outTime).diff(inTime, "m") % 60;
        attendancedata.session[attendancedata.session.length - 1].duration =
          dayjs()
            .set("hours", totalWorkHour)
            .set("minute", totalWorkMinute)
            .format("HH:mm");
        await attendancedata.save();
      }
      return res.json({
        status: "success",
        message: "session added successfully",
      });
    } catch (err) {
      return res.json({
        status: 400,
        message: err.message,
      });
    }
  },
  async getOneSession(req, res) {
    const attendanceData = await attendanceModel
      .findOne({
        userId: req.user.id,
        "session[session.length -1].outTime": null,
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: 200,
      attendanceData: attendanceData,
    });
  },
  async updateAttendance(req, res) {
    try {
      const { id } = req.params;
      const { session, workingDate } = req.body;
      await attendanceModel.updateOne(
        { $and: [{ userId: id }, { workingDate: workingDate }] },
        { $set: { session: session } }
      );
      return res.json({
        status: "success",
        message: "Attendance updated successfully",
      });
    } catch (err) {
      return res.json({
        status: 400,
        message: err.message,
      });
    }
  },
  async sessionActive(req, res) {
    try {
      const attendanceDatas = await attendanceModel
        .findOne({ userId: req.user.id })
        .sort({ createdAt: -1 });
      if (
        !attendanceDatas.session[attendanceDatas.session.length - 1].outTime
      ) {
        return res.json({
          status: 200,
          sessionActive: true,
        });
      } else {
        return res.json({
          status: 400,
          sessionActive: false,
        });
      }
    } catch (err) {
      return res.json({
        status: 400,
        message: err.message,
      });
    }
  },
};

module.exports = attendanceController;
