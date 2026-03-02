// TravelCard.jsx (improved)
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'

export default function TravelCard({ place, onBook }) {
  const navigate = useNavigate()

  const handleImageClick = () => {
    navigate("/location", { state: { place } })
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900 h-full flex flex-col group">
        
        <div 
          onClick={handleImageClick}
          className="relative h-56 w-full overflow-hidden cursor-pointer"
        >
          <img
            src={place.image || '/placeholder-image.jpg'}
            alt={place.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-5 flex flex-col justify-between flex-1">
          
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold line-clamp-1">
                {place.title}
              </h3>
              {place.rating && (
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">{place.rating}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
              {place.description}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Starting from</p>
                <p className="font-bold text-xl text-primary">
                  {place.price}
                </p>
              </div>
              {place.duration && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ⏱ {place.duration}
                </p>
              )}
            </div>
          </div>

          <Button
            className="mt-4 w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transform transition-all duration-300 hover:shadow-lg"
            onClick={() => onBook && onBook(place)}
          >
            Book Now
          </Button>

        </CardContent>
      </Card>
    </motion.div>
  )
}

TravelCard.propTypes = {
  place: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number,
    duration: PropTypes.string
  }).isRequired,
  onBook: PropTypes.func
}