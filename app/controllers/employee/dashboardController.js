const attendanceModel = require("../../db/model/attendanceSchema");
const calculateTime = require("../../../common/calculateTime");
const dayjs = require("dayjs");
const dashboardController = {
  async getDashboard(req, res) {
    let { startDate, endDate } = req.query;
    // startDate = "2023/10/10";
    // endDate = "2023/10/12";
    if (startDate && endDate) {
      await attendanceModel
        .find({
          userId: req.user.id,
          $and: [
            {
              workingDate: {
                $gte: dayjs(startDate),
              },
            },
            {
              workingDate: {
                $lte: dayjs(endDate).add(1, "day"),
              },
            },
          ],
        })
        .select("-__v -createdAt -updatedAt ")
        .populate({
          path: "userId",
          select: "srNo name address",
        })
        .then(async (empDatas) => {
          const { totalWorkHour, totalBreakHour, totalOverHour } =
            await calculateTime(empDatas);
          return res.json({
            status: 200,
            employeeData: empDatas[0],
            totalWorkHour: totalWorkHour,
            totalBreakHour: totalBreakHour,
            totalOverHour: totalOverHour,
          });
        });
    } else {
      await attendanceModel
        .find({
          userId: req.user.id,
        })
        .select("-__v -createdAt -updatedAt ")
        .populate({
          path: "userId",
          select: "srNo name address",
        })
        .then(async (empDatas) => {
          const { totalWorkHour, totalBreakHour, totalOverHour } =
            await calculateTime(empDatas);
          return res.json({
            status: 200,
            employeeData: empDatas[0],
            totalWorkHour: totalWorkHour,
            totalBreakHour: totalBreakHour,
            totalOverHour: totalOverHour,
          });
        });
    }
  },
};

module.exports = dashboardController;
