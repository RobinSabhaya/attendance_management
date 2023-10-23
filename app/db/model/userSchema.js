const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      default: "employee",
    },
    srNo: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
    },
    date: {
      type: Date,
      default: new Date().toString(),
    },
  },
  { timestamps: true }
);

// const CounterSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 0 },
// });
// var counter = mongoose.model("counter", CounterSchema);

// userSchema.pre("save", async function (next) {
//   var doc = this;
//   counter
//     .findByIdAndUpdate({ _id: "sortId" }, { $inc: { seq: 1 } })
//     .then((data) => {
//       doc.srNo = data.seq;
//       next();
//     });
// });
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
