const dayjs = require("dayjs");
console.log(
  dayjs(new Date("2023-10-10T00:00:00 05:30").setHours(0, 0, 0)).format(
    "DD/MM/YYYY HH:mm:ss"
  )
);
