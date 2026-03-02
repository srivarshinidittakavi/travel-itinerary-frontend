// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { authApi } from "@/services/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const response = await authApi.login(email, password)
      const { user, token } = response
      
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)
      
      if (user.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/dashboard")
      }
      
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message || "Login failed" }
    }
  }, [navigate])

  const register = useCallback(async (userData) => {
    try {
      const response = await authApi.register(userData)
      const { user, token } = response
      
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)
      navigate("/dashboard")
      
      return { success: true }
    } catch (error) {
      console.error("Register error:", error)
      return { success: false, error: error.message || "Registration failed" }
    }
  }, [navigate])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    authApi.logout()
    navigate("/")
  }, [navigate])

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}