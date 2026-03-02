// pages/PlaceDetails.jsx
import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"  // Added useNavigate
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  ArrowLeft,
  ThumbsUp,
  MessageCircle
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Sample destination data (should match Home.jsx)
const destinations = {
  paris: {
    id: 1,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    price: "$1,299",
    rating: 4.8,
    reviews: 1243,
    description: "The City of Light awaits with iconic landmarks and romantic ambiance",
    longDescription: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.",
    activities: ["Eiffel Tower", "Louvre Museum", "Seine Cruise", "Notre-Dame", "Montmartre"],
    bestTimeToVisit: "June to August",
    currency: "Euro (€)",
    language: "French",
    timezone: "CET (UTC+1)"
  },
  bali: {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    price: "$899",
    rating: 4.9,
    reviews: 2156,
    description: "Tropical paradise with pristine beaches and rich cultural heritage",
    longDescription: "Bali is a province of Indonesia and the westernmost of the Lesser Sunda Islands. Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
    activities: ["Temple Tours", "Surfing", "Rice Terraces", "Yoga Retreats", "Waterfalls"],
    bestTimeToVisit: "April to October",
    currency: "Indonesian Rupiah (IDR)",
    language: "Indonesian, Balinese",
    timezone: "WITA (UTC+8)"
  },
  "swiss-alps": {
    id: 4,
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
    price: "$2,199",
    rating: 4.7,
    reviews: 876,
    description: "Breathtaking mountain views and world-class skiing",
    longDescription: "The Swiss Alps offer spectacular views, world-class skiing, and charming mountain villages. A paradise for outdoor enthusiasts.",
    activities: ["Skiing", "Hiking", "Mountain Railways", "Paragliding"],
    bestTimeToVisit: "December to March",
    currency: "Swiss Franc (CHF)",
    language: "German, French, Italian",
    timezone: "CET (UTC+1)"
  },
  tokyo: {
    id: 5,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    price: "$1,899",
    rating: 4.8,
    reviews: 1654,
    description: "Ultra-modern metropolis meets traditional culture",
    longDescription: "Tokyo, Japan's bustling capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.",
    activities: ["Shibuya Crossing", "Senso-ji Temple", "Robot Restaurant", "Tokyo Tower"],
    bestTimeToVisit: "March to May",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    timezone: "JST (UTC+9)"
  },
  santorini: {
    id: 6,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    price: "$1,599",
    rating: 4.9,
    reviews: 1432,
    description: "Stunning sunsets and white-washed architecture",
    longDescription: "Santorini is one of the Cyclades islands in the Aegean Sea. It's famous for dramatic views, stunning sunsets from Oia town, and white-washed buildings.",
    activities: ["Sunset Views", "Wine Tasting", "Volcano Tour", "Red Beach"],
    bestTimeToVisit: "May to October",
    currency: "Euro (€)",
    language: "Greek",
    timezone: "EET (UTC+2)"
  },
  "new-york": {
    id: 8,
    name: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    price: "$1,599",
    rating: 4.7,
    reviews: 2134,
    description: "The Big Apple - city that never sleeps",
    longDescription: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers.",
    activities: ["Times Square", "Central Park", "Broadway", "Statue of Liberty"],
    bestTimeToVisit: "April to June",
    currency: "US Dollar (USD)",
    language: "English",
    timezone: "EST (UTC-5)"
  },
  banff: {
    id: 7,
    name: "Banff",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1516633630638-6f6b5f2b7d5e?w=800",
    price: "$1,799",
    rating: 4.8,
    reviews: 876,
    description: "Stunning Canadian Rockies with turquoise lakes",
    longDescription: "Banff is a resort town in the province of Alberta, located within Banff National Park. The park is home to glaciers, icefields, dense coniferous forest, and stunning mountain landscapes.",
    activities: ["Lake Louise", "Hiking", "Wildlife Watching", "Hot Springs"],
    bestTimeToVisit: "June to August",
    currency: "Canadian Dollar (CAD)",
    language: "English, French",
    timezone: "MST (UTC-7)"
  },
  interlaken: {
    id: 9,
    name: "Interlaken",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    price: "$1,999",
    rating: 4.9,
    reviews: 987,
    description: "Adventure capital nestled between lakes and mountains",
    longDescription: "Interlaken is a traditional resort town in the mountainous Bernese Oberland region of central Switzerland. Built on a stretch of alluvial land, between Lake Thun and Lake Brienz, it's a popular starting point for excursions into the Alps.",
    activities: ["Paragliding", "Jungfraujoch", "Lake Thun", "Harder Kulm"],
    bestTimeToVisit: "June to September",
    currency: "Swiss Franc (CHF)",
    language: "German",
    timezone: "CET (UTC+1)"
  }
}

export default function PlaceDetails() {
  const { name } = useParams()
  const location = useLocation()
  const navigate = useNavigate()  // Added this
  const [selectedDate, setSelectedDate] = useState(null)
  const [guests, setGuests] = useState(2)
  const [isInWishlist, setIsInWishlist] = useState(false)
  
  // Get place from state or from destinations lookup
  const [place, setPlace] = useState(location.state?.place || null)

  useEffect(() => {
    // If no place in state (direct URL access), find it by name
    if (!place && name) {
      const foundPlace = destinations[name?.toLowerCase()]
      if (foundPlace) {
        setPlace(foundPlace)
      } else {
        // Try with hyphenated names
        const hyphenatedName = name?.toLowerCase().replace(/\s+/g, '-')
        const found = destinations[hyphenatedName]
        if (found) {
          setPlace(found)
        } else {
          // If not found, redirect to home
          navigate("/")
        }
      }
    }

    // Check if in wishlist
    if (place) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      setIsInWishlist(wishlist.some(item => item.id === place.id))
    }
  }, [name, place, navigate])

  const toggleWishlist = () => {
    if (!place) return
    
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

  const handleBooking = () => {
    if (!place) return
    
    if (!selectedDate) {
      alert("Please select a date")
      return
    }

    const booking = {
      id: Date.now(),
      location: place.name,
      date: format(selectedDate, "PPP"),
      guests,
      status: "confirmed",
      bookingDate: new Date().toISOString(),
      image: place.image,
      totalPrice: parseInt(place.price.replace(/[^0-9]/g, '')) * guests
    }

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]")
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]))
    
    alert("Booking Confirmed! Check your dashboard.")
    navigate("/dashboard")
  }

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
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

        {/* Place Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base text-white/90">{place.country}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3">{place.name}</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm sm:text-base font-medium">{place.rating}</span>
                <span className="ml-1 text-xs sm:text-sm text-white/70">({place.reviews} reviews)</span>
              </div>
              <div className="w-px h-4 bg-white/30 hidden xs:block" />
              <span className="text-sm sm:text-base text-white/90">Starting from {place.price}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Description */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">About {place.name}</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {place.longDescription}
                </p>
              </CardContent>
            </Card>

            {/* Key Information */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Essential Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">Language</p>
                      <p className="text-xs sm:text-sm text-gray-500">{place.language}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">Time Zone</p>
                      <p className="text-xs sm:text-sm text-gray-500">{place.timezone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">Best Time to Visit</p>
                      <p className="text-xs sm:text-sm text-gray-500">{place.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">Currency</p>
                      <p className="text-xs sm:text-sm text-gray-500">{place.currency}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activities */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Popular Activities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {place.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold">Reviews</h2>
                  <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    Write a Review
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b last:border-0 pb-3 sm:pb-4 last:pb-0">
                      <div className="flex items-start gap-2 sm:gap-3 mb-2">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                          <AvatarImage src={`https://i.pravatar.cc/40?img=${review}`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                            <div>
                              <span className="font-semibold text-sm sm:text-base">Traveler {review}</span>
                              <div className="flex items-center gap-0.5 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">
                            Amazing experience! The place was beautiful and the local culture is fascinating.
                            Would definitely recommend to anyone visiting.
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <Button variant="ghost" size="sm" className="gap-1 h-7 sm:h-8 text-xs">
                              <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                              Helpful
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 sm:top-24">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Book Your Trip</h3>
                
                {/* Price */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{place.price}</p>
                  <p className="text-xs sm:text-sm text-gray-500">per person</p>
                </div>

                {/* Date Selection */}
                <div className="mb-3 sm:mb-4">
                  <label className="text-xs sm:text-sm font-medium mb-1 block">Select Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-full justify-start text-left font-normal text-xs sm:text-sm",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guests */}
                <div className="mb-4 sm:mb-6">
                  <label className="text-xs sm:text-sm font-medium mb-1 block">Number of Guests</label>
                  <div className="flex items-center justify-between p-2 sm:p-3 border rounded-lg">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </Button>
                    <span className="font-medium text-sm sm:text-base">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      onClick={() => setGuests(guests + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-3 sm:pt-4 mb-4 sm:mb-6">
                  <div className="flex justify-between mb-1 sm:mb-2 text-xs sm:text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      ${parseInt(place.price.replace(/[^0-9]/g, '')) * guests}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1 sm:mb-2 text-xs sm:text-sm">
                    <span>Taxes & Fees</span>
                    <span className="font-medium">$120</span>
                  </div>
                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ${parseInt(place.price.replace(/[^0-9]/g, '')) * guests + 120}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <Button 
                  className="w-full mb-3 bg-gradient-to-r from-primary to-primary/60 text-sm sm:text-base"
                  size="default"
                  onClick={handleBooking}
                  disabled={!selectedDate}
                >
                  {selectedDate ? "Book Now" : "Select Date to Book"}
                </Button>

                {/* Contact Options */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1 sm:gap-2 text-xs">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1 sm:gap-2 text-xs">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    Email
                  </Button>
                </div>

                {/* Amenities */}
                <div className="mt-4 sm:mt-6">
                  <p className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Popular amenities:</p>
                  <div className="grid grid-cols-2 gap-1 sm:gap-2">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs">
                      <Wifi className="w-3 h-3 sm:w-4 sm:h-4" />
                      Free WiFi
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs">
                      <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />
                      Breakfast
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs">
                      <ParkingCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Parking
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs">
                      <Utensils className="w-3 h-3 sm:w-4 sm:h-4" />
                      Restaurant
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}