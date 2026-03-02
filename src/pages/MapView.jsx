// pages/MapView.jsx
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Navigation,
  Search,
  Compass,
  Star,
  Clock,
  Phone,
  Globe,
  Route,
  LocateFixed
} from "lucide-react"

// Sample location data
const locations = [
  {
    id: 1,
    name: "Eiffel Tower",
    city: "Paris",
    country: "France",
    lat: 48.8584,
    lng: 2.2945,
    type: "attraction",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400",
    description: "Iconic iron tower offering panoramic city views"
  },
  {
    id: 2,
    name: "Louvre Museum",
    city: "Paris",
    country: "France",
    lat: 48.8606,
    lng: 2.3376,
    type: "museum",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566370751778-9ff9bf8d5cdb?w=400",
    description: "World's largest art museum with famous masterpieces"
  },
  {
    id: 3,
    name: "Notre-Dame Cathedral",
    city: "Paris",
    country: "France",
    lat: 48.8530,
    lng: 2.3499,
    type: "attraction",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400",
    description: "Medieval Catholic cathedral with Gothic architecture"
  }
]

export default function MapView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [mapStyle, setMapStyle] = useState("standard")

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Interactive Map</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Explore destinations and get directions
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Panel - Locations List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardContent>
          </Card>

          {/* Locations List */}
          <Card className="max-h-[600px] overflow-y-auto">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Nearby Places</h3>
              <div className="space-y-3">
                {filteredLocations.map((location) => (
                  <motion.div
                    key={location.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedLocation?.id === location.id
                        ? 'bg-primary/10 border border-primary'
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex gap-3">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{location.name}</h4>
                        <p className="text-sm text-gray-500">{location.city}, {location.country}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {location.type}
                          </Badge>
                          <div className="flex items-center text-sm">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {location.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map Controls */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Map Controls</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => setMapStyle('standard')}
                >
                  <MapPin className="w-4 h-4" />
                  Standard View
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => setMapStyle('satellite')}
                >
                  <Globe className="w-4 h-4" />
                  Satellite View
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        alert(`Your location: ${position.coords.latitude}, ${position.coords.longitude}`)
                      })
                    }
                  }}
                >
                  <LocateFixed className="w-4 h-4" />
                  Find My Location
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Map */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full relative">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
                {/* Simulated Map Grid */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                  opacity: 0.2
                }} />
                
                {/* Location Markers */}
                {filteredLocations.map((location) => (
                  <motion.div
                    key={location.id}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${((location.lng + 180) / 360) * 100}%`,
                      top: `${((90 - location.lat) / 180) * 100}%`
                    }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className={`relative ${
                      selectedLocation?.id === location.id
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}>
                      <MapPin className="w-8 h-8 fill-current" />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        {location.name}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Selected Location Details */}
                {selectedLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-md"
                  >
                    <div className="flex gap-3">
                      <img
                        src={selectedLocation.image}
                        alt={selectedLocation.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold">{selectedLocation.name}</h3>
                        <p className="text-sm text-gray-500">{selectedLocation.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button size="sm" className="gap-1">
                            <Navigation className="w-3 h-3" />
                            Directions
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Route className="w-3 h-3" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}