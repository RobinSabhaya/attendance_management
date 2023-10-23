const express = require("express");
const {
  getEmployee,
  updateEmployee,
  deleteEmployee,
  postEmployee,
} = require("../../app/controllers/employee/employeeController");
const {
  getLeave,
  postLeave,
  manageReqLeave,
  getOneLeave,
} = require("../../app/controllers/employee/leaveController");
const {
  getDashboard,
} = require("../../app/controllers/employee/dashboardController");

const {
  getAttendance,
  getOneSession,
  getOneAttendance,
  postAttendance,
  updateAttendance,
  sessionActive,
} = require("../../app/controllers/employee/attendanceController");
const auth = require("../../app/middlewares/auth");
const route = express.Router();
route.use(auth);

route.get("/", getEmployee);
route.get("/attendance", getAttendance);
route.get("/attendance/session", getOneSession);
route.get("/attendance/:id", getOneAttendance);
route.post("/attendance", postAttendance);
route.put("/attendance/:id", updateAttendance);
route.get("/attendance/session/active", sessionActive);

route.post("/", postEmployee);
route.put("/:id", updateEmployee);
route.delete("/:id", deleteEmployee);

route.get("/dashboard", getDashboard);

route.post("/leave", postLeave);
route.get("/leave", getLeave);
route.get("/leave/:id", getOneLeave);
route.put("/leave/:id", manageReqLeave);
module.exports = route;
