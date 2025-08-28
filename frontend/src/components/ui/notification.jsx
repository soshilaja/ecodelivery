// NotificationBell Component
import { useState } from "react";
import { Bell, AlertCircle, CheckCircle2, Clock, Package } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "delivery",
      message: "Your package has been delivered",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "alert",
      message: "Delivery delay due to weather",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "success",
      message: "Carbon offset goal achieved!",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const handleMouseLeave = () => {
    setTimeout(() => {
        setIsOpen(false);
    }, 300);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };


  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case "delivery":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 rounded-full text-gray-400 hover:text-white focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        aria-label={`${unreadCount} unread notifications`}
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span
            className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 
            transform translate-x-1/2 -translate-y-1/2"
          ></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 
              ring-black ring-opacity-5 focus:outline-none z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg
                      ${notification.read ? "bg-white" : "bg-blue-50"}`}
                  >
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
