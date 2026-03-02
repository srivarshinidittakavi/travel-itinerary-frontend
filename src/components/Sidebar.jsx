import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import {
  Home,
  LayoutDashboard,
  Calendar,
  Map,
  Wallet,
  Package,
  FileText,
  Settings,
  LogOut,
  BookOpen,
  Shield,
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  Star,
  Users,
  BarChart3,
  PlusCircle,
  HelpCircle,
  Moon,
  Sun
} from "lucide-react"

const userNavItems = [
  { path: "/", label: "Home", icon: Home, color: "blue" },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "green" },
  { path: "/bookings", label: "My Bookings", icon: BookOpen, color: "purple" },
  { path: "/itinerary", label: "Itinerary", icon: Calendar, color: "orange" },
  { path: "/map", label: "Map View", icon: Map, color: "red" },
  { path: "/expenses", label: "Expenses", icon: Wallet, color: "yellow" },
  { path: "/packing", label: "Packing List", icon: Package, color: "indigo" },
  { path: "/documents", label: "Documents", icon: FileText, color: "pink" },
  { path: "/wishlist", label: "Wishlist", icon: Star, color: "amber" },
]

const adminNavItems = [
  { path: "/admin", label: "Dashboard", icon: BarChart3, color: "blue" },
  { path: "/admin/users", label: "Users", icon: Users, color: "green" },
  { path: "/admin/bookings", label: "Bookings", icon: BookOpen, color: "purple" },
  { path: "/admin/analytics", label: "Analytics", icon: BarChart3, color: "orange" },
  { path: "/admin/settings", label: "Settings", icon: Settings, color: "gray" },
]

const bottomNavItems = [
  { path: "/settings", label: "Settings", icon: Settings, color: "gray" },
  { path: "/help", label: "Help", icon: HelpCircle, color: "blue" },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 },
  }

  const NavLink = ({ item, collapsed }) => {
    const isActive = location.pathname === item.path
    const Icon = item.icon

    const getIconColor = (color) => {
      const colors = {
        blue: "text-blue-500",
        green: "text-green-500",
        purple: "text-purple-500",
        orange: "text-orange-500",
        red: "text-red-500",
        yellow: "text-yellow-500",
        indigo: "text-indigo-500",
        pink: "text-pink-500",
        amber: "text-amber-500",
        gray: "text-gray-500"
      }
      return colors[color] || "text-gray-500"
    }

    return (
      <Link
        to={item.path}
        className={`
          relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group
          ${isActive 
            ? 'text-primary bg-primary/10' 
            : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5'
          }
          ${collapsed ? 'justify-center' : 'justify-start'}
        `}
      >
        <Icon className={`w-5 h-5 min-w-[20px] ${isActive ? 'text-primary' : getIconColor(item.color)} transition-colors group-hover:text-primary`} />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-medium whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
        {isActive && (
          <motion.div
            layoutId="sidebar-indicator"
            className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
    )
  }

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <motion.aside
      initial={false}
      animate={isCollapsed && !isHovered ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="hidden md:block h-screen fixed top-0 left-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden z-30"
    >
      <div className="flex flex-col h-full pt-16"> {/* Added pt-16 to account for navbar */}
        {/* Logo */}
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <span className="text-white font-bold text-xl">✈</span>
            </motion.div>
            {(!isCollapsed || isHovered) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              >
                TravelPlanner
              </motion.span>
            )}
          </Link>
        </div>

        {/* User Info */}
        {user && (!isCollapsed || isHovered) && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              item={item} 
              collapsed={isCollapsed && !isHovered}
            />
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
              text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5
              ${isCollapsed && !isHovered ? 'justify-center' : 'justify-start'}
            `}
          >
            {theme === 'light' ? 
              <Moon className="w-5 h-5 text-purple-500" /> : 
              <Sun className="w-5 h-5 text-yellow-500" />
            }
            {(!isCollapsed || isHovered) && (
              <span className="font-medium">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
            )}
          </button>

          {bottomNavItems.map((item) => (
            <NavLink 
              key={item.path} 
              item={item} 
              collapsed={isCollapsed && !isHovered}
            />
          ))}

          {/* Logout Button */}
          <button
            onClick={logout}
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
              text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20
              ${isCollapsed && !isHovered ? 'justify-center' : 'justify-start'}
            `}
          >
            <LogOut className="w-5 h-5 text-red-500" />
            {(!isCollapsed || isHovered) && (
              <span className="font-medium">Logout</span>
            )}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-primary" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-primary" />
          )}
        </button>
      </div>
    </motion.aside>
  )

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-50 w-12 h-12 bg-gradient-to-r from-primary to-primary/60 rounded-full shadow-lg flex items-center justify-center text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex flex-col h-full pt-16"> {/* Added pt-16 for navbar */}
                {/* Mobile Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <Link to="/" className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">✈</span>
                      </div>
                      <span className="font-bold text-xl">TravelPlanner</span>
                    </Link>
                    <button
                      onClick={() => setIsMobileOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      <ChevronLeft className="w-5 h-5 text-primary" />
                    </button>
                  </div>

                  {/* Mobile User Info */}
                  {user && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                  {navItems.map((item) => (
                    <NavLink key={item.path} item={item} collapsed={false} />
                  ))}
                </nav>

                {/* Mobile Bottom Navigation */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                  >
                    {theme === 'light' ? 
                      <Moon className="w-5 h-5 text-purple-500" /> : 
                      <Sun className="w-5 h-5 text-yellow-500" />
                    }
                    <span className="font-medium">
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </button>

                  {bottomNavItems.map((item) => (
                    <NavLink key={item.path} item={item} collapsed={false} />
                  ))}

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}