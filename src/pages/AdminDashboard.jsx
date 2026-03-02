// pages/AdminDashboard.jsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Hotel,
  Calendar,
  DollarSign,
  TrendingUp,
  Download,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Globe,
  Star,
  AlertCircle,
  Settings,
  BookOpen,
  LayoutDashboard,
  Menu,
  X
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  const [stats, setStats] = useState({
    totalUsers: 15234,
    activeBookings: 892,
    totalRevenue: 456789,
    popularDestinations: 24,
    growthRate: 23.5,
    conversionRate: 68.2
  })

  const [recentBookings, setRecentBookings] = useState([
    {
      id: 1,
      user: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=1",
      destination: "Paris, France",
      hotel: "Luxury Grand Hotel",
      date: "2024-03-15",
      amount: 25000,
      status: "confirmed"
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "https://i.pravatar.cc/40?img=2",
      destination: "Bali, Indonesia",
      hotel: "Ocean View Resort",
      date: "2024-03-16",
      amount: 32000,
      status: "pending"
    },
    {
      id: 3,
      user: "Mike Johnson",
      avatar: "https://i.pravatar.cc/40?img=3",
      destination: "Tokyo, Japan",
      hotel: "Sakura Hotel",
      date: "2024-03-14",
      amount: 28000,
      status: "cancelled"
    },
    {
      id: 4,
      user: "Sarah Williams",
      avatar: "https://i.pravatar.cc/40?img=4",
      destination: "Santorini, Greece",
      hotel: "Sunset Villa",
      date: "2024-03-17",
      amount: 18000,
      status: "confirmed"
    }
  ])

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      bookings: 12,
      totalSpent: 45000,
      status: "active",
      joined: "2024-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      bookings: 8,
      totalSpent: 32000,
      status: "active",
      joined: "2024-02-01"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      bookings: 5,
      totalSpent: 18000,
      status: "inactive",
      joined: "2024-02-15"
    }
  ])

  const [bookings, setBookings] = useState([
    {
      id: 1,
      user: "John Doe",
      destination: "Paris",
      hotel: "Luxury Grand",
      date: "2024-03-15",
      amount: 25000,
      status: "confirmed"
    },
    {
      id: 2,
      user: "Jane Smith",
      destination: "Bali",
      hotel: "Ocean Resort",
      date: "2024-03-16",
      amount: 32000,
      status: "pending"
    },
    {
      id: 3,
      user: "Mike Johnson",
      destination: "Tokyo",
      hotel: "Sakura Hotel",
      date: "2024-03-14",
      amount: 28000,
      status: "cancelled"
    }
  ])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024

  const StatCard = ({ icon: Icon, label, value, trend, suffix = "" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className="h-full">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-primary/10 rounded-xl">
              <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
            </div>
            {trend && (
              <Badge variant={trend > 0 ? "default" : "destructive"} className="flex items-center gap-1 text-xs">
                <TrendingUp className={`w-3 h-3 ${trend < 0 ? "rotate-180" : ""}`} />
                {Math.abs(trend)}%
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{label}</p>
          <p className="text-lg sm:text-2xl font-bold truncate">
            {typeof value === 'number' && label.includes('Revenue') 
              ? `$${value.toLocaleString()}${suffix}` 
              : `${value.toLocaleString()}${suffix}`}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )

  const getStatusBadge = (status) => {
    const variants = {
      confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200",
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
    return variants[status] || variants.pending
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
      case 'pending': return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
      case 'cancelled': return <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
      case 'active': return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
      case 'inactive': return <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
      default: return null
    }
  }

  const TabButton = ({ id, label, icon: Icon, onClick }) => (
    <button
      onClick={() => {
        onClick()
        if (isMobile) setIsMobileMenuOpen(false)
      }}
      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all flex items-center gap-2 sm:gap-3 ${
        activeTab === id
          ? "bg-primary/10 text-primary font-medium"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-sm sm:text-base">{label}</span>
      {activeTab === id && (
        <motion.div
          layoutId="activeTabIndicator"
          className="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full"
        />
      )}
    </button>
  )

  const MobileMenu = () => (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center text-white"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 z-50 shadow-xl md:hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-bold text-lg">Admin Menu</h2>
            </div>
            <div className="p-3 space-y-1">
              <TabButton id="dashboard" label="Dashboard" icon={LayoutDashboard} onClick={() => setActiveTab("dashboard")} />
              <TabButton id="users" label="Users" icon={Users} onClick={() => setActiveTab("users")} />
              <TabButton id="bookings" label="Bookings" icon={BookOpen} onClick={() => setActiveTab("bookings")} />
              <TabButton id="analytics" label="Analytics" icon={BarChart3} onClick={() => setActiveTab("analytics")} />
              <TabButton id="settings" label="Settings" icon={Settings} onClick={() => setActiveTab("settings")} />
            </div>
          </motion.div>
        </>
      )}
    </>
  )

  const DesktopTabs = () => (
    <div className="hidden md:flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
      <TabButton id="dashboard" label="Dashboard" icon={LayoutDashboard} onClick={() => setActiveTab("dashboard")} />
      <TabButton id="users" label="Users" icon={Users} onClick={() => setActiveTab("users")} />
      <TabButton id="bookings" label="Bookings" icon={BookOpen} onClick={() => setActiveTab("bookings")} />
      <TabButton id="analytics" label="Analytics" icon={BarChart3} onClick={() => setActiveTab("analytics")} />
      <TabButton id="settings" label="Settings" icon={Settings} onClick={() => setActiveTab("settings")} />
    </div>
  )

  // Render different content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case "dashboard":
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Stats Grid - Responsive columns */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <StatCard icon={Users} label="Total Users" value={stats.totalUsers} trend={12} />
              <StatCard icon={Calendar} label="Active Bookings" value={stats.activeBookings} trend={8} />
              <StatCard icon={DollarSign} label="Total Revenue" value={stats.totalRevenue} trend={15} />
              <StatCard icon={Globe} label="Destinations" value={stats.popularDestinations} trend={5} />
            </div>

            {/* Secondary Stats - Stack on mobile, grid on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Growth Metrics</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-xs sm:text-sm">
                        <span className="text-gray-500">Monthly Growth</span>
                        <span className="font-medium">{stats.growthRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="bg-primary h-1.5 sm:h-2 rounded-full" style={{ width: `${stats.growthRate}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-xs sm:text-sm">
                        <span className="text-gray-500">Conversion Rate</span>
                        <span className="font-medium">{stats.conversionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div className="bg-green-500 h-1.5 sm:h-2 rounded-full" style={{ width: `${stats.conversionRate}%` }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Popular Destinations</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {["Paris", "Bali", "Tokyo", "Santorini"].map((dest, i) => (
                      <div key={dest} className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                          <span>{dest}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{Math.floor(Math.random() * 100) + 50} bookings</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings - Horizontal scroll on mobile */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Recent Bookings</h3>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm whitespace-nowrap">User</TableHead>
                          <TableHead className="text-xs sm:text-sm whitespace-nowrap">Destination</TableHead>
                          <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">Hotel</TableHead>
                          <TableHead className="text-xs sm:text-sm whitespace-nowrap">Date</TableHead>
                          <TableHead className="text-xs sm:text-sm whitespace-nowrap">Amount</TableHead>
                          <TableHead className="text-xs sm:text-sm whitespace-nowrap">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentBookings.slice(0, 3).map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                                  <AvatarImage src={booking.avatar} />
                                  <AvatarFallback className="text-xs">{booking.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-none">{booking.user}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">{booking.destination}</TableCell>
                            <TableCell className="text-xs sm:text-sm hidden sm:table-cell truncate max-w-[120px]">{booking.hotel}</TableCell>
                            <TableCell className="text-xs sm:text-sm whitespace-nowrap">{booking.date}</TableCell>
                            <TableCell className="text-xs sm:text-sm font-medium">${booking.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge className={`${getStatusBadge(booking.status)} flex items-center gap-1 w-fit text-xs px-1.5 py-0.5 sm:px-2 sm:py-1`}>
                                {getStatusIcon(booking.status)}
                                <span className="hidden xs:inline">{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "users":
        return (
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">User Management</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap">User</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">Email</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap">Bookings</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden md:table-cell">Total Spent</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden lg:table-cell">Joined</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                                <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-none">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm hidden sm:table-cell truncate max-w-[120px]">{user.email}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{user.bookings}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden md:table-cell">${user.totalSpent.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusBadge(user.status)} flex items-center gap-1 w-fit text-xs px-1.5 py-0.5 sm:px-2 sm:py-1`}>
                              {getStatusIcon(user.status)}
                              <span className="hidden xs:inline">{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm hidden lg:table-cell">{user.joined}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "bookings":
        return (
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">All Bookings</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap">User</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap">Destination</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">Hotel</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap">Date</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap hidden md:table-cell">Amount</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm whitespace-nowrap text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-none">{booking.user}</TableCell>
                          <TableCell className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">{booking.destination}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden sm:table-cell truncate max-w-[120px]">{booking.hotel}</TableCell>
                          <TableCell className="text-xs sm:text-sm whitespace-nowrap">{booking.date}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden md:table-cell">${booking.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusBadge(booking.status)} flex items-center gap-1 w-fit text-xs px-1.5 py-0.5 sm:px-2 sm:py-1`}>
                              {getStatusIcon(booking.status)}
                              <span className="hidden xs:inline">{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "analytics":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="md:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Booking Trends</h3>
                <div className="h-48 sm:h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-500">Chart coming soon...</p>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Revenue Breakdown</h3>
                <div className="h-48 sm:h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-500">Chart coming soon...</p>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">User Growth</h3>
                <div className="h-48 sm:h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-500">Chart coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "settings":
        return (
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Admin Settings</h3>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-3">General Settings</h4>
                  <div className="grid gap-3 sm:gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg gap-2 sm:gap-4">
                      <div>
                        <p className="font-medium text-sm sm:text-base">Site Maintenance Mode</p>
                        <p className="text-xs sm:text-sm text-gray-500">Put the site in maintenance mode</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">Enable</Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg gap-2 sm:gap-4">
                      <div>
                        <p className="font-medium text-sm sm:text-base">Email Notifications</p>
                        <p className="text-xs sm:text-sm text-gray-500">Configure admin email settings</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">Configure</Button>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-3">Security</h4>
                  <div className="grid gap-3 sm:gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg gap-2 sm:gap-4">
                      <div>
                        <p className="font-medium text-sm sm:text-base">Two-Factor Authentication</p>
                        <p className="text-xs sm:text-sm text-gray-500">Enhance account security</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">Setup</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 md:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Welcome back, Admin! Here's what's happening with your platform.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Filter</span>
            </Button>
            <Button size={isMobile ? "sm" : "default"} className="gap-1 sm:gap-2 bg-gradient-to-r from-primary to-primary/60 text-xs sm:text-sm">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Navigation - Different for mobile/desktop */}
        <DesktopTabs />
        <MobileMenu />

        {/* Dynamic Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 sm:mt-6"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  )
}