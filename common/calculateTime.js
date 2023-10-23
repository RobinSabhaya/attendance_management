const dayjs = require("dayjs");
const calculateTime = async (empDatas) => {
  try {
    const workArr = [];
    const breakArr = [];
    const overTimeArr = [];
    let totalWorkHour;
    let totalBreakHour;
    let totalOverHour;
    empDatas.forEach((empData) => {
      //! handle work types
      const workData = empData.session.filter((ele) => ele.type === "work");
      if (workData.length > 0) {
        workData.forEach((ele) => {
          if (ele.outTime) {
            const workTime = dayjs()
              .hour(ele?.duration.split(":")[0])
              .minute(ele?.duration.split(":")[1]);
            workArr.push(workTime.format("HH:mm"));
          }
        });
      }
      let workHourArr = [];
      let workMinArr = [];
      let workMin;
      let workHour;
      if (workArr.length > 0) {
        workArr.forEach((ele) => {
          var data = ele.split(":")[0];
          workHourArr.push(data, 0);
          var data2 = ele.split(":")[1];
          workMinArr.push(data2, 0);
          if (workMinArr.length > 0) {
            workMinArr.reduce((acc, ele) => {
              return (workMin = +acc + +ele);
            });
          }
          if (workHourArr.length > 0) {
            workHourArr.reduce((acc, ele) => {
              return (workHour = +acc + +ele);
            });
          }
        });
      }
      if (workData.length > 0) {
        totalWorkHour = Math.floor(workMin / 60) + ":" + (workMin % 60);
        workHourArr.push(totalWorkHour.split(":")[0]);
        if (workHourArr.length > 0) {
          workHourArr.reduce((acc, ele) => {
            return (workHour = +acc + +ele);
          });
        }
        totalWorkHour = dayjs()
          .minute(totalWorkHour.split(":")[1])
          .format("mm");
        totalWorkHour = workHour + ":" + totalWorkHour;
      }

      //! handle break types
      const breakData = empData.session.filter((ele) => ele.type === "break");
      if (breakData.length > 0) {
        breakData.forEach((ele) => {
          if (ele.outTime) {
            const breakTime = dayjs()
              .hour(ele.duration.split(":")[0])
              .minute(ele.duration.split(":")[1]);
            breakArr.push(breakTime.format("HH:mm"));
          }
        });
      }
      let breakHoursArr = [];
      let breakMinArr = [];
      let breakMin;
      let breakHour;
      if (breakArr.length > 0) {
        breakArr.forEach((ele) => {
          if (ele) {
            const data3 = ele.split(":")[0];
            const data4 = ele.split(":")[1];
            breakHoursArr.push(data3, 0);
            breakMinArr.push(data4, 0);
          }
        });
        if (breakMinArr.length > 0) {
          breakMinArr.reduce((acc, ele) => {
            return (breakMin = +acc + +ele);
          });
        }
        if (breakHoursArr.length > 0) {
          breakHoursArr.reduce((acc, ele) => {
            return (breakHour = +acc + +ele);
          });
        }
      }
      if (breakData.length > 0) {
        totalBreakHour = Math.floor(breakMin / 60) + ":" + (breakMin % 60);
        breakHoursArr.push(totalBreakHour.split(":")[0]);
        if (breakHoursArr.length > 0) {
          breakHoursArr.reduce((acc, ele) => {
            return (breakHour = +acc + +ele);
          });
        }
        totalBreakHour = dayjs()
          .minute(totalBreakHour.split(":")[1])
          .format("mm");
        totalBreakHour = breakHour + ":" + totalBreakHour;
      }
      // ! handle overtime types
      const overTimeData = empData.session.filter(
        (ele) => ele.type === "overtime"
      );
      if (overTimeData.length > 0) {
        overTimeData.forEach((ele) => {
          if (ele.outTime) {
            const overTime = dayjs()
              .hour(ele.duration.split(":")[0])
              .minute(ele.duration.split(":")[1]);
            overTimeArr.push(overTime.format("HH:mm"));
          }
        });
      }
      let overHoursArr = [];
      let overMinArr = [];
      let overMin;
      let overHour;
      if (overTimeArr.length > 0) {
        overTimeArr.forEach((ele) => {
          const data3 = ele.split(":")[0];
          const data4 = ele.split(":")[1];
          overHoursArr.push(data3, 0);
          overMinArr.push(data4, 0);
        });

        if (overMinArr.length > 0) {
          overMinArr.reduce((acc, ele) => {
            return (overMin = +acc + +ele);
          });
        }
        if (overMinArr.length > 0) {
          overHoursArr.reduce((acc, ele) => {
            return (overHour = +acc + +ele);
          });
        }
      }
      if (overTimeData.length > 0) {
        totalOverHour = Math.floor(overMin / 60) + ":" + (overMin % 60);
        overHoursArr.push(totalOverHour.split(":")[0]);
        if (overHoursArr.length > 0) {
          overHoursArr.reduce((acc, ele) => {
            return (overHour = +acc + +ele);
          });
        }
        totalOverHour = dayjs()
          .minute(totalOverHour.split(":")[1])
          .format("mm");
        totalOverHour = overHour + ":" + totalOverHour;
      }
    });
    return { totalWorkHour, totalBreakHour, totalOverHour };
  } catch (err) {
    return console.log(err);
  }
};

module.exports = calculateTime;
