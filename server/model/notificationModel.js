const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  seen: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: new Date(),
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
exports.Notification = Notification;
