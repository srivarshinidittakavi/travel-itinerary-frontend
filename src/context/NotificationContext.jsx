import { createContext, useState, useContext } from "react"

const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error("useNotifications must be used within NotificationProvider")
  return context
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome!",
      message: "Thanks for joining Travel Itinerary Planner",
      time: "Just now",
      read: false,
      type: "success"
    },
    {
      id: 2,
      title: "Trip Reminder",
      message: "Your trip to Paris starts in 3 days",
      time: "1 hour ago",
      read: false,
      type: "reminder"
    },
    {
      id: 3,
      title: "Booking Confirmed",
      message: "Your hotel in Bali is confirmed",
      time: "Yesterday",
      read: true,
      type: "booking"
    }
  ])

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const addNotification = (notification) => {
    setNotifications([{
      id: Date.now(),
      time: "Just now",
      read: false,
      ...notification
    }, ...notifications])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  )
}