import React, { useState, useEffect } from 'react';
import { insuranceService } from '../../services/insuranceService';
import './NotificationBell.css';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await insuranceService.getNotifications();
      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await insuranceService.markNotificationRead(id);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="notification-container">
      <button className="bell-btn" onClick={() => setIsOpen(!isOpen)}>
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="dropdown">
          <h4>Notifications</h4>
          {notifications.length === 0 ? (
            <p className="empty">No new alerts</p>
          ) : (
            <ul>
              {notifications.map(n => (
                <li key={n._id} className={n.isRead ? 'read' : 'unread'} onClick={() => markAsRead(n._id)}>
                  <p>{n.message}</p>
                  <small>{new Date(n.createdAt).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
