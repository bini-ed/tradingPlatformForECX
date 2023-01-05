const { Notification } = require("../model/notificationModel");

const getNotification = async (req, res) => {
  const { id } = req.user;

  const findNotification = await Notification.find({ userId: id });
  if (!findNotification.length)
    return res.status(404).send("No notification found");

  return res.send(findNotification);
};

const updateNotification = async (req, res) => {
  const { id } = req.params;
  const findNotification = await Notification.findById(id);
  if (!findNotification) return res.status(404).send("No notification found");
  const updateNotification = await Notification.findByIdAndUpdate(id, {
    seen: true,
  });
  if (updateNotification) {
    return res.send(updateNotification);
  }
};

module.exports = { getNotification, updateNotification };
