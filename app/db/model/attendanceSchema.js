const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    workingDate: {
      type: Date,
      default: new Date().toISOString(),
    },
    session: [
      {
        type: {
          type: String,
        },
        inTime: {
          type: Date,
        },
        outTime: {
          type: Date,
        },
        duration: {
          type: String,
        },
        workNote: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const attendanceModel = mongoose.model("attendance", attendanceSchema);

module.exports = attendanceModel;
