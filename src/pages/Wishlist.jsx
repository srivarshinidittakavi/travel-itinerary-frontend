// pages/Wishlist.jsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Heart,
  MapPin,
  Star,
  Trash2,
  Search,
  Filter,
  Calendar,
  DollarSign,
  PlusCircle
} from "lucide-react"

export default function Wishlist() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlist(savedWishlist)
  }, [])

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id)
    setWishlist(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
  }

  const clearWishlist = () => {
    setWishlist([])
    localStorage.setItem("wishlist", "[]")
  }

  const filteredWishlist = wishlist.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.country?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {wishlist.length} {wishlist.length === 1 ? 'destination' : 'destinations'} saved
          </p>
        </div>
        {wishlist.length > 0 && (
          <Button variant="outline" className="mt-4 md:mt-0 gap-2" onClick={clearWishlist}>
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      {wishlist.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search wishlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      )}

      {/* Wishlist Grid */}
      {wishlist.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWishlist.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative h-48">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-white/90 dark:bg-gray-900/90 text-black dark:text-white">
                      <Heart className="w-3 h-3 fill-red-500 text-red-500 mr-1" />
                      Wishlist
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.country || "Destination"}
                      </p>
                    </div>
                    {item.rating && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm">{item.rating}</span>
                      </div>
                    )}
                  </div>

                  {item.price && (
                    <p className="font-bold text-primary mt-2">{item.price}</p>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button 
                      className="flex-1"
                      onClick={() => navigate(`/location/${item.name?.toLowerCase()}`)}
                    >
                      View Details
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">
              Start saving your favorite destinations for future trips
            </p>
            <Button onClick={() => navigate("/")} className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Explore Destinations
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}