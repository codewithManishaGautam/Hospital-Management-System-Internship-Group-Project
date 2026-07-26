const Notification = require('../models/Notification');

const notify = async ({ message, type, referenceId, referenceModel }) => {
  try {
    await Notification.create({ message, type, referenceId, referenceModel });
  } catch (error) {
    console.error('Notification error:', error.message);
  }
};

module.exports = { notify };
