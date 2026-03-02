import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import {
  Menu,
  Home,
  Info,
  LayoutDashboard,
  Calendar,
  Map,
  Wallet,
  Package,
  FileText,
  Settings,
  Bell,
  Sun,
  Moon,
  LogOut,
  User,
  LogIn,
  UserPlus,
  Shield,
  BookOpen
} from "lucide-react"

const navItems = [
  { path: "/", label: "Home", icon: Home, public: true },
  { path: "/about", label: "About", icon: Info, public: true },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, public: false },
  { path: "/bookings", label: "Bookings", icon: BookOpen, public: false },
]

const adminItems = [
  { path: "/admin", label: "Admin", icon: Shield, public: false },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'U'
  }

  const NavLink = ({ item, mobile = false, onClick }) => {
    const isActive = location.pathname === item.path
    const Icon = item.icon

    return (
      <Link
        to={item.path}
        onClick={onClick}
        className={`
          relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
          ${isActive 
            ? 'text-primary bg-primary/10 font-medium' 
            : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5'
          }
          ${mobile ? 'w-full' : ''}
        `}
      >
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute inset-0 border-2 border-primary rounded-lg"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
    )
  }

  // Filter nav items based on auth status
  const filteredNavItems = navItems.filter(item => 
    item.public || user
  )

  if (user?.role === 'admin') {
    filteredNavItems.push(...adminItems)
  }

  return (
    <nav className={`
      sticky top-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
      }
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">✈</span>
            </motion.div>
            <span className="font-bold text-xl hidden sm:block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              TravelPlanner
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {filteredNavItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            {/* Notifications - Only for logged in users */}
            {user && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  3
                </Badge>
              </Button>
            )}

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b dark:border-gray-800">
                    {user ? (
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Welcome to TravelPlanner</h3>
                        <div className="flex gap-2">
                          <Button className="flex-1" asChild>
                            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                          </Button>
                          <Button variant="outline" className="flex-1" asChild>
                            <Link to="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 p-4">
                    <div className="space-y-1">
                      {filteredNavItems.map((item) => (
                        <NavLink 
                          key={item.path} 
                          item={item} 
                          mobile 
                          onClick={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  {user && (
                    <div className="p-4 border-t dark:border-gray-800">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-600"
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}