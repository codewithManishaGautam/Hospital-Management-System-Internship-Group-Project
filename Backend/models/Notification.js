const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['pre_auth', 'claim', 'document', 'billing', 'policy', 'scheme', 'system'],
    required: true
  },
  referenceId: { type: mongoose.Schema.Types.ObjectId },
  referenceModel: { type: String },
  isRead: { type: Boolean, default: false },
  readAt: { type: Date },
  readBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
