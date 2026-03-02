// LocationDetails.jsx
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  MapPin,
  Star,
  Calendar as CalendarIcon,
  Users,
  Wifi,
  Coffee,
  ParkingCircle,
  Utensils,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Globe,
  Heart,
  Share2,
  ArrowLeft
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function LocationDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const place = location.state?.place
  const [selectedDate, setSelectedDate] = useState(null)
  const [guests, setGuests] = useState(2)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    if (!place) {
      navigate("/")
    }
    // Check if in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsInWishlist(wishlist.some(item => item.id === place?.id))
  }, [place, navigate])

  if (!place) return null

  const hotels = [
    {
      id: 1,
      title: "Luxury Grand Hotel",
      price: 5000,
      currency: "₹",
      rating: 4.8,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Room Service"],
      description: "Experience luxury at its finest in the heart of the city",
      rooms: ["Deluxe Room", "Executive Suite", "Presidential Suite"]
    },
    {
      id: 2,
      title: "Ocean View Resort",
      price: 6500,
      currency: "₹",
      rating: 4.9,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      amenities: ["Beach Access", "Infinity Pool", "Spa", "Water Sports", "Bar"],
      description: "Breathtaking ocean views with world-class amenities",
      rooms: ["Ocean View Room", "Beachfront Villa", "Premium Suite"]
    },
    {
      id: 3,
      title: "Boutique Heritage Inn",
      price: 3500,
      currency: "₹",
      rating: 4.7,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      amenities: ["Free WiFi", "Breakfast", "Garden", "Library", "Bike Rental"],
      description: "Charming boutique hotel with local character",
      rooms: ["Standard Room", "Heritage Suite", "Garden View"]
    }
  ]

  const activities = [
    {
      id: 1,
      name: "City Tour",
      duration: "4 hours",
      price: "$45",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800"
    },
    {
      id: 2,
      name: "Local Food Tasting",
      duration: "3 hours",
      price: "$35",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
    }
  ]

  const handleBooking = (hotel) => {
    if (!selectedDate) {
      alert("Please select a date")
      return
    }
    
    const booking = {
      id: Date.now(),
      location: place.name,
      hotel: hotel.title,
      date: format(selectedDate, "PPP"),
      guests,
      totalPrice: hotel.price * guests,
      status: "confirmed",
      bookingDate: new Date().toISOString()
    }

    const existing = JSON.parse(localStorage.getItem("bookings")) || []
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]))
    
    // Show success message and redirect
    alert("Booking Confirmed! Check your dashboard for details.")
    navigate("/dashboard")
  }

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    if (isInWishlist) {
      const updated = wishlist.filter(item => item.id !== place.id)
      localStorage.setItem("wishlist", JSON.stringify(updated))
      setIsInWishlist(false)
    } else {
      localStorage.setItem("wishlist", JSON.stringify([...wishlist, place]))
      setIsInWishlist(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full"
            onClick={toggleWishlist}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Location Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="text-white/90">{place.country}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{place.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{place.rating}</span>
                <span className="ml-1 text-white/70">({place.reviews} reviews)</span>
              </div>
              <div className="w-px h-5 bg-white/30" />
              <span className="text-white/90">{place.price} per person</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hotels" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels" className="space-y-6">
            {/* Booking Filters */}
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Check-in Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Guests</label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </Button>
                    <span className="mx-4 font-medium">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(guests + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Room Type</label>
                  <select className="w-full p-2 border rounded-md dark:bg-gray-800">
                    <option>Any</option>
                    <option>Deluxe</option>
                    <option>Suite</option>
                    <option>Premium</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Hotels Grid */}
            <div className="grid gap-6">
              {hotels.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img
                          src={hotel.image}
                          alt={hotel.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-2xl font-bold">{hotel.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                              {hotel.description}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-lg">
                            {hotel.currency} {hotel.price}
                            <span className="text-sm text-gray-500 ml-1">/night</span>
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 font-medium">{hotel.rating}</span>
                          </div>
                          <span className="text-gray-500">({hotel.reviews} reviews)</span>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.map((amenity, idx) => (
                            <Badge key={idx} variant="outline" className="flex items-center gap-1">
                              {amenity === "Free WiFi" && <Wifi className="w-3 h-3" />}
                              {amenity === "Pool" && <ParkingCircle className="w-3 h-3" />}
                              {amenity === "Restaurant" && <Utensils className="w-3 h-3" />}
                              {amenity}
                            </Badge>
                          ))}
                        </div>

                        {/* Room Types */}
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Available Rooms:</p>
                          <div className="flex flex-wrap gap-2">
                            {hotel.rooms.map((room, idx) => (
                              <Badge key={idx} variant="secondary">
                                {room}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button 
                          className="w-full md:w-auto"
                          onClick={() => handleBooking(hotel)}
                          disabled={!selectedDate}
                        >
                          {selectedDate ? "Book Now" : "Select Date to Book"}
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities">
            <div className="grid md:grid-cols-2 gap-6">
              {activities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-2">{activity.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1">{activity.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{activity.price}</span>
                      <Button>Book Activity</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Traveler Reviews</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start gap-3 mb-2">
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/40?img=${review}`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">John Doe</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Amazing experience! The hotel was beautiful and the staff was incredibly helpful.
                        Would definitely recommend to anyone visiting.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}