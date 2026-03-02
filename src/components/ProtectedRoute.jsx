import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
    />
  </div>
)

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    if (requiredRole === 'admin') {
      return <Navigate to="/dashboard" replace />
    }
    return <Navigate to="/" replace />
  }

  return children
}

export const AdminRoute = ({ children }) => (
  <ProtectedRoute requiredRole="admin">
    {children}
  </ProtectedRoute>
)

export const PublicRoute = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/dashboard"

  if (user) {
    return <Navigate to={from} replace />
  }

  return children
}