// components/AdminRoute.jsx
import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
    />
  </div>
)

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}