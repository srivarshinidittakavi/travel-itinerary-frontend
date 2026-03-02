import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  MapPin,
  Hotel,
  DollarSign,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  ArrowUpDown
} from "lucide-react"

export default function BookingHistory() {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    setBookings(savedBookings)
  }, [])

  useEffect(() => {
    let filtered = [...bookings]

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter(b => b.status === activeTab)
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.hotel?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.date || a.bookingDate)
      const dateB = new Date(b.date || b.bookingDate)
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

    setFilteredBookings(filtered)
  }, [bookings, activeTab, searchTerm, sortOrder])

  const getStatusBadge = (status) => {
    const variants = {
      confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
    return variants[status] || variants.pending
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      default: return null
    }
  }

  const downloadBooking = (booking) => {
    const content = `
BOOKING CONFIRMATION
====================
Booking ID: ${booking.id || 'N/A'}
Date: ${new Date(booking.bookingDate || booking.date).toLocaleDateString()}
Status: ${booking.status || 'Confirmed'}

DESTINATION
===========
Location: ${booking.location || booking.destination}
Hotel: ${booking.hotel}
Check-in: ${booking.date}
Guests: ${booking.guests || 2}

PAYMENT DETAILS
===============
Total Amount: $${booking.totalPrice || booking.amount || 0}
    `
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `booking-${booking.id || 'confirmation'}.txt`
    a.click()
  }

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    totalSpent: bookings.reduce((acc, b) => acc + (b.totalPrice || b.amount || 0), 0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            View and manage all your travel bookings
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-2xl font-bold">${stats.totalSpent.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by destination or hotel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort by Date {sortOrder === "desc" ? "(Newest)" : "(Oldest)"}
        </Button>
      </div>

      {/* Bookings Tabs */}
      <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredBookings.length > 0 ? (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-xl font-semibold">
                              {booking.location || booking.destination}
                            </h3>
                            <Badge className={`${getStatusBadge(booking.status)} flex items-center gap-1`}>
                              {getStatusIcon(booking.status)}
                              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Hotel className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-300">{booking.hotel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-300">
                                {new Date(booking.date || booking.bookingDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-300">
                                {booking.guests || 2} {booking.guests === 1 ? 'Guest' : 'Guests'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <span className="font-semibold text-primary">
                                ${booking.totalPrice || booking.amount || 0}
                              </span>
                            </div>
                          </div>

                          {booking.bookingDate && (
                            <p className="text-xs text-gray-400 mt-3">
                              Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-1"
                            onClick={() => downloadBooking(booking)}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No Bookings Found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? "No bookings match your search." 
                    : activeTab === "all" 
                      ? "You haven't made any bookings yet." 
                      : `No ${activeTab} bookings found.`}
                </p>
                <Button onClick={() => window.location.href = "/"}>
                  Explore Destinations
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}