const attendanceModel = require("../../db/model/attendanceSchema");
const leaveModel = require("../../db/model/leaveSchema");
const calculateTime = require("../../../common/calculateTime");
const dayjs = require("dayjs");
const analyticsController = {
  async getAnalytics(req, res) {
    const { startDate = "2023/10/15", endDate = "2023/10/31" } = req.query;
    try {
      const { id } = req.params;
      const leaveData = await leaveModel.find({
        userId: req.user.id,
        $and: [
          { createdAt: { $gte: dayjs(startDate) } },
          { createdAt: { $lte: dayjs(endDate).add(1, "day") } },
        ],
        approvalStatus: "approved",
      });
      await attendanceModel
        .find({
          userId: id,
          $and: [
            { workingDate: { $gte: dayjs(startDate) } },
            { workingDate: { $lte: dayjs(endDate).add(1, "day") } },
          ],
        })
        .populate({ path: "userId" })
        .then(async (empdatas) => {
          const { totalWorkHour, totalBreakHour, totalOverHour } =
            await calculateTime(empdatas);
          let startdate = dayjs(startDate);
          let enddate = dayjs(endDate);
          let currentDate = startdate;
          let sundayCount = 0;
          let satArr = [];
          //! Logic of finding sunday
          while (currentDate.isBefore(enddate) || currentDate.isSame(enddate)) {
            if (currentDate.day() === 0) {
              sundayCount++;
            }
            currentDate = currentDate.add(1, "day");
          }
          //! Logic of finding first saturday
          for (let i = startdate.month(); i <= enddate.month(); i++) {
            let firstSat = startdate.startOf("month").month(i).day(6);
            if (firstSat.date() <= enddate.date()) {
              satArr.push(firstSat.format("DD/MM/YYYY"));
            }
          }
          //! Logic of finding third saturday
          for (let i = startdate.month(); i <= enddate.month(); i++) {
            let thirdSat = startdate
              .startOf("month")
              .month(i)
              .day(6)
              .add(2, "week");
            if (thirdSat.date() <= enddate.date()) {
              satArr.push(thirdSat.format("DD/MM/YYYY"));
            }
          }
          let sumOfDay;
          if (satArr.length > 0 && sundayCount) {
            sumOfDay = satArr.length + sundayCount + leaveData.length;
          }
          const countDay = Math.abs(dayjs(startdate).diff(enddate, "day"));
          const totalcompanyWorkHour = Math.abs(countDay - sumOfDay) * 8;
          const totalcompanyBreakHour = Math.abs(countDay - sumOfDay);
          return res.json({
            totalcompanyWorkHour: totalcompanyWorkHour,
            totalcompanyBreakHour: totalcompanyBreakHour,
            totalWorkHour: totalWorkHour,
            totalBreakHour: totalBreakHour,
            totalOverHour: totalOverHour,
          });
        });
    } catch (err) {
      return res.json({
        status: 400,
        err: err.message,
      });
    }
  },
};

module.exports = analyticsController;
