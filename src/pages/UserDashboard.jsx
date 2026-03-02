// pages/UserDashboard.jsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MapPin,
  Hotel,
  Plane,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Download,
  Share2,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  DollarSign,
  Package,
  FileText,
  PlusCircle,
  Heart,
  TrendingUp,
  Globe,
  Star
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function UserDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [bookings, setBookings] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalSpent: 0,
    upcomingTrips: 0,
    savedItems: 0,
    countries: 0,
    daysTraveled: 0
  })

  useEffect(() => {
    // Load data from localStorage
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    
    setBookings(savedBookings)
    setWishlist(savedWishlist)
    
    // Calculate stats
    const uniqueCountries = new Set(savedBookings.map(b => b.location?.split(',')[1]?.trim())).size
    
    setStats({
      totalTrips: savedBookings.length,
      totalSpent: savedBookings.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0),
      upcomingTrips: savedBookings.filter(b => new Date(b.date) > new Date()).length,
      savedItems: savedWishlist.length,
      countries: uniqueCountries || 0,
      daysTraveled: savedBookings.length * 5 // Estimate
    })
  }, [])

  const upcomingTrips = bookings
    .filter(b => new Date(b.date) > new Date())
    .slice(0, 2)

  const recentActivities = [
    { id: 1, type: "booking", message: "Booked trip to Paris", time: "2 hours ago" },
    { id: 2, type: "wishlist", message: "Added Bali to wishlist", time: "5 hours ago" },
    { id: 3, type: "review", message: "Left a review for Tokyo hotel", time: "1 day ago" }
  ]

  const StatCard = ({ icon: Icon, label, value, color = "primary" }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
            <div className={`p-3 bg-${color}/10 rounded-full`}>
              <Icon className={`w-6 h-6 text-${color}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const QuickAction = ({ icon: Icon, label, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="p-3 bg-primary/10 rounded-full mb-2">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Here's what's happening with your travel plans
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={logout} className="text-red-600">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Calendar} label="Total Trips" value={stats.totalTrips} color="blue" />
        <StatCard icon={DollarSign} label="Total Spent" value={`$${stats.totalSpent}`} color="green" />
        <StatCard icon={Clock} label="Upcoming" value={stats.upcomingTrips} color="yellow" />
        <StatCard icon={Heart} label="Saved" value={stats.savedItems} color="red" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Countries Visited</p>
                <p className="text-2xl font-bold">{stats.countries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Days Traveled</p>
                <p className="text-2xl font-bold">{stats.daysTraveled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          <QuickAction icon={PlusCircle} label="New Trip" onClick={() => navigate("/")} />
          <QuickAction icon={Hotel} label="Hotels" onClick={() => navigate("/")} />
          <QuickAction icon={Plane} label="Flights" onClick={() => navigate("/")} />
          <QuickAction icon={CreditCard} label="Expenses" onClick={() => navigate("/expenses")} />
          <QuickAction icon={Package} label="Packing" onClick={() => navigate("/packing")} />
          <QuickAction icon={FileText} label="Documents" onClick={() => navigate("/documents")} />
          <QuickAction icon={Calendar} label="Itinerary" onClick={() => navigate("/itinerary")} />
          <QuickAction icon={MapPin} label="Map View" onClick={() => navigate("/map")} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Upcoming Trips */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Upcoming Trips</h2>
                <Button variant="link" onClick={() => navigate("/bookings")}>View All</Button>
              </div>

              {upcomingTrips.length > 0 ? (
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <motion.div
                      key={trip.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 cursor-pointer"
                      onClick={() => navigate(`/trip/${trip.id}`)}
                    >
                      <div className="flex items-start gap-4">
                        {trip.image && (
                          <img
                            src={trip.image}
                            alt={trip.location}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{trip.location}</h3>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <Calendar className="w-4 h-4" />
                                {trip.date}
                              </p>
                              {trip.hotel && (
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                  <Hotel className="w-4 h-4" />
                                  {trip.hotel}
                                </p>
                              )}
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              {trip.status || "Confirmed"}
                            </Badge>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Preparation Progress</span>
                              <span className="text-sm font-medium">45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No upcoming trips</p>
                  <Button className="mt-4" onClick={() => navigate("/")}>
                    Plan a Trip
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Recommendations */}
        <div className="space-y-6">
          {/* Travel Stats */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Travel Stats</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">This Year</span>
                    <span className="text-sm font-medium">3 trips</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Budget Used</span>
                    <span className="text-sm font-medium">$2,450 / $5,000</span>
                  </div>
                  <Progress value={49} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Reviews Written</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended for You */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
              <div className="space-y-3">
                {["Bali", "Tokyo", "Santorini"].map((dest) => (
                  <div key={dest} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{dest}</span>
                    </div>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Travel Tip</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Always carry a portable charger and download offline maps before your trip!
              </p>
              <Button variant="link" className="mt-2 p-0">More tips →</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}