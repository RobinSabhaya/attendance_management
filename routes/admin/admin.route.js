const express = require("express");
const route = express.Router();
const auth = require("../../app/middlewares/auth");
const {
  getAnalytics,
} = require("../../app/controllers/admin/analyticsController");

const {
  manageLeave,
  upadateLeave,
  deleteLeave,
} = require("../../app/controllers/employee/leaveController");

route.use(auth);
route.get("/analytics/:id", getAnalytics);
route.post("/leave", manageLeave);
route.put("/leave/:id", upadateLeave);
route.delete("/leave/:id", deleteLeave);

module.exports = route;
