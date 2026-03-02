// pages/Home.jsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  MapPin,
  Calendar,
  TrendingUp,
  Star,
  Compass,
  Sun,
  Cloud,
  ArrowRight,
  Heart,
  Mountain,
  Umbrella,
  Building2
} from "lucide-react"

// Destinations with categories
const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    price: "$1,299",
    rating: 4.8,
    reviews: 1243,
    description: "The City of Light awaits with iconic landmarks and romantic ambiance",
    activities: ["Eiffel Tower", "Louvre Museum", "Seine Cruise"],
    category: "city",
    tags: ["romantic", "culture", "shopping"]
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    price: "$899",
    rating: 4.9,
    reviews: 2156,
    description: "Tropical paradise with pristine beaches and rich cultural heritage",
    activities: ["Temple Tours", "Surfing", "Rice Terraces"],
    category: "beach",
    tags: ["beach", "culture", "adventure"]
  },
  {
    id: 3,
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    price: "$2,499",
    rating: 4.9,
    reviews: 987,
    description: "Luxury overwater bungalows in crystal clear waters",
    activities: ["Snorkeling", "Sunset Cruise", "Underwater Restaurant"],
    category: "beach",
    tags: ["luxury", "honeymoon", "relaxation"]
  },
  {
    id: 4,
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
    price: "$2,199",
    rating: 4.7,
    reviews: 876,
    description: "Breathtaking mountain views and world-class skiing",
    activities: ["Skiing", "Hiking", "Mountain Railways"],
    category: "mountain",
    tags: ["adventure", "skiing", "nature"]
  },
  {
    id: 5,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    price: "$1,899",
    rating: 4.8,
    reviews: 1654,
    description: "Ultra-modern metropolis meets traditional culture",
    activities: ["Shibuya Crossing", "Senso-ji Temple", "Robot Restaurant"],
    category: "city",
    tags: ["technology", "culture", "food"]
  },
  {
    id: 6,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    price: "$1,599",
    rating: 4.9,
    reviews: 1432,
    description: "Stunning sunsets and white-washed architecture",
    activities: ["Sunset Views", "Wine Tasting", "Volcano Tour"],
    category: "beach",
    tags: ["romantic", "scenic", "luxury"]
  },
  {
    id: 7,
    name: "Banff",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1516633630638-6f6b5f2b7d5e?w=800",
    price: "$1,799",
    rating: 4.8,
    reviews: 876,
    description: "Stunning Canadian Rockies with turquoise lakes",
    activities: ["Lake Louise", "Hiking", "Wildlife Watching"],
    category: "mountain",
    tags: ["nature", "hiking", "photography"]
  },
  {
    id: 8,
    name: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    price: "$1,599",
    rating: 4.7,
    reviews: 2134,
    description: "The Big Apple - city that never sleeps",
    activities: ["Times Square", "Central Park", "Broadway"],
    category: "city",
    tags: ["urban", "culture", "entertainment"]
  },
  {
    id: 9,
    name: "Interlaken",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    price: "$1,999",
    rating: 4.9,
    reviews: 987,
    description: "Adventure capital nestled between lakes and mountains",
    activities: ["Paragliding", "Jungfraujoch", "Lake Thun"],
    category: "mountain",
    tags: ["adventure", "nature", "extreme"]
  }
]

// Category configuration with proper colors for both light and dark mode
const categories = [
  { 
    id: "all", 
    label: "All Destinations", 
    icon: Compass, 
    color: "blue",
    bgClass: "bg-blue-500",
    hoverClass: "hover:bg-blue-600",
    textClass: "text-blue-600 dark:text-blue-400",
    borderClass: "border-blue-200 dark:border-blue-800"
  },
  { 
    id: "beach", 
    label: "Beach", 
    icon: Umbrella, 
    color: "cyan",
    bgClass: "bg-cyan-500",
    hoverClass: "hover:bg-cyan-600",
    textClass: "text-cyan-600 dark:text-cyan-400",
    borderClass: "border-cyan-200 dark:border-cyan-800"
  },
  { 
    id: "mountain", 
    label: "Mountain", 
    icon: Mountain, 
    color: "emerald",
    bgClass: "bg-emerald-500",
    hoverClass: "hover:bg-emerald-600",
    textClass: "text-emerald-600 dark:text-emerald-400",
    borderClass: "border-emerald-200 dark:border-emerald-800"
  },
  { 
    id: "city", 
    label: "City", 
    icon: Building2, 
    color: "purple",
    bgClass: "bg-purple-500",
    hoverClass: "hover:bg-purple-600",
    textClass: "text-purple-600 dark:text-purple-400",
    borderClass: "border-purple-200 dark:border-purple-800"
  }
]

export default function Home() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [wishlist, setWishlist] = useState([])
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlist(savedWishlist.map(item => item.id))
  }, [])

  // Filter destinations based on search and category
  useEffect(() => {
    let filtered = [...destinations]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category (if not "all")
    if (selectedCategory !== "all") {
      filtered = filtered.filter(dest => dest.category === selectedCategory)
    }

    setFilteredDestinations(filtered)
  }, [searchTerm, selectedCategory])

  const handleDestinationClick = (destination) => {
    // Create URL-friendly name (lowercase, replace spaces with hyphens)
    const urlName = destination.name.toLowerCase().replace(/\s+/g, '-')
    navigate(`/place/${urlName}`, { 
      state: { place: destination } 
    })
  }

  const toggleWishlist = (e, destinationId) => {
    e.stopPropagation()
    e.preventDefault()
    const destination = destinations.find(d => d.id === destinationId)
    
    let updatedWishlist
    if (wishlist.includes(destinationId)) {
      updatedWishlist = wishlist.filter(id => id !== destinationId)
      // Remove from localStorage
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const filtered = saved.filter(item => item.id !== destinationId)
      localStorage.setItem("wishlist", JSON.stringify(filtered))
    } else {
      updatedWishlist = [...wishlist, destinationId]
      // Add to localStorage
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]")
      localStorage.setItem("wishlist", JSON.stringify([...saved, destination]))
    }
    setWishlist(updatedWishlist)
  }

  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Responsive padding */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 py-12 sm:py-16 px-3 sm:px-4">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative container mx-auto text-center text-white px-2 sm:px-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg">
            Discover Your Next Adventure ✈️
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 text-white/90 max-w-2xl mx-auto drop-shadow px-2">
            Explore breathtaking destinations around the world
          </p>
          
          {/* Search Bar - Responsive sizing */}
          <div className="max-w-2xl mx-auto relative px-2 sm:px-0">
            <Search className="absolute left-6 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              placeholder="Search destinations, countries, or activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 sm:pl-12 pr-4 py-4 sm:py-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-white/30 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-full shadow-xl text-sm sm:text-base w-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Category Filters - Responsive wrapping */}
      <section className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                size={isMobile ? "sm" : "default"}
                className={`rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-6 transition-all font-medium text-xs sm:text-sm ${
                  isSelected 
                    ? `${category.bgClass} ${category.hoverClass} text-white shadow-lg border-0` 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 ${
                  isSelected ? 'text-white' : category.textClass
                }`} />
                <span className={isSelected ? 'text-white font-semibold' : ''}>
                  {isMobile ? category.label.split(' ')[0] : category.label}
                </span>
                {isSelected && (
                  <Badge variant="secondary" className="ml-1 sm:ml-2 bg-white/20 text-white border-0 text-xs">
                    {filteredDestinations.length}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>

        {/* Active Filters Display */}
        {selectedCategory !== "all" && (
          <div className="flex justify-center mt-3 sm:mt-4">
            <Badge variant="outline" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs sm:text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                Showing <span className="font-bold text-primary">{filteredDestinations.length}</span> 
              </span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white capitalize">
                {selectedCategory}
              </span>
              <span className="text-gray-700 dark:text-gray-300 hidden xs:inline"> destinations</span>
              <button 
                onClick={() => setSelectedCategory("all")}
                className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold"
              >
                ✕
              </button>
            </Badge>
          </div>
        )}
      </section>

      {/* Results Count */}
      <section className="container mx-auto px-3 sm:px-4">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
          Found <span className="font-bold text-primary">{filteredDestinations.length}</span> destinations
          {searchTerm && <span> for "<span className="font-medium text-gray-900 dark:text-gray-200">{searchTerm}</span>"</span>}
        </p>
      </section>

      {/* Destinations Grid - Responsive columns */}
      <section className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        {filteredDestinations.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          >
            {filteredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
                onClick={() => handleDestinationClick(destination)}
              >
                <Card className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Category Badge */}
                    <Badge 
                      className={`absolute top-2 left-2 sm:top-3 sm:left-3 ${categories.find(c => c.id === destination.category)?.bgClass} text-white border-0 shadow-lg text-xs px-2 py-0.5 sm:px-2.5 sm:py-1`}
                    >
                      {destination.category}
                    </Badge>

                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 rounded-full shadow-lg h-7 w-7 sm:h-8 sm:w-8"
                      onClick={(e) => toggleWishlist(e, destination.id)}
                    >
                      <Heart 
                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${
                          wishlist.includes(destination.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-600 dark:text-gray-300"
                        }`} 
                      />
                    </Button>

                    {/* Destination Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white">
                      <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold drop-shadow-lg truncate max-w-[60%]">
                          {destination.name}
                        </h3>
                        <Badge variant="secondary" className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white border-0 shadow text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                          {destination.country}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-0.5 sm:ml-1 font-medium drop-shadow">{destination.rating}</span>
                        </div>
                        <span className="text-white/80 text-xs drop-shadow hidden xs:inline">({destination.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                      {destination.description}
                    </p>
                    
                    {/* Tags - Responsive wrapping */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {destination.tags.slice(0, isMobile ? 2 : 3).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs px-1.5 py-0.5 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                          #{tag}
                        </Badge>
                      ))}
                      {destination.tags.length > (isMobile ? 2 : 3) && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          +{destination.tags.length - (isMobile ? 2 : 3)}
                        </Badge>
                      )}
                    </div>

                    {/* Activities Preview */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                      {destination.activities.slice(0, isMobile ? 1 : 2).map((activity, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0">
                          {activity}
                        </Badge>
                      ))}
                      {destination.activities.length > (isMobile ? 1 : 2) && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0">
                          +{destination.activities.length - (isMobile ? 1 : 2)}
                        </Badge>
                      )}
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Starting from</span>
                        <p className="text-base sm:text-lg md:text-xl font-bold text-primary">{destination.price}</p>
                      </div>
                      <Button className="group bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4" size="sm">
                        <span className="hidden xs:inline">Explore</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 xs:ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // No Results Found
          <Card className="p-6 sm:p-8 md:p-12 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Compass className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 text-gray-900 dark:text-white">No Destinations Found</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              {searchTerm 
                ? `No destinations matching "${searchTerm}"` 
                : `No ${selectedCategory} destinations available`}
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-base"
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </section>

      {/* Category Showcase */}
      {selectedCategory === "all" && !searchTerm && (
        <section className="bg-gray-100 dark:bg-gray-800 py-8 sm:py-10 md:py-12 mt-4 sm:mt-6 md:mt-8">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 text-gray-900 dark:text-white">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
              Explore by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {categories.filter(c => c.id !== "all").map((cat) => {
                const Icon = cat.icon
                const count = destinations.filter(d => d.category === cat.id).length
                return (
                  <motion.div
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    className={`relative rounded-xl overflow-hidden cursor-pointer shadow-lg ${cat.bgClass}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <div className="p-3 sm:p-4 md:p-6 text-white text-center">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto mb-1 sm:mb-2 md:mb-3 drop-shadow-lg" />
                      <h3 className="text-sm sm:text-base md:text-lg font-bold drop-shadow-lg">{cat.label}</h3>
                      <p className="text-xs sm:text-sm text-white/80 drop-shadow">{count} destinations</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}