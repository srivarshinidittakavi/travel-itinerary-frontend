import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Compass } from "lucide-react"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <Compass className="w-24 h-24 mx-auto text-primary" />
        </motion.div>
        
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Oops! It seems you've wandered off the map. The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-x-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
          <Button onClick={() => navigate("/")}>
            Return Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}