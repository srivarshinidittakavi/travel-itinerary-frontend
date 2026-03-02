import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
  Globe,
  Calendar,
  Map,
  Wallet,
  Package,
  Bell,
  Share2,
  Download,
  Sparkles,
  Cloud,
  FileText,
  Star
} from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Intuitive Itinerary Builder",
    description: "Create structured, day-by-day itineraries with flights, accommodations, and activities"
  },
  {
    icon: Map,
    title: "Interactive Map Integration",
    description: "Visualize destinations and get real-time directions between points"
  },
  {
    icon: Bell,
    title: "Timely Travel Reminders",
    description: "Push notifications for flights, check-ins, and activity reservations"
  },
  {
    icon: Wallet,
    title: "Comprehensive Expense Tracker",
    description: "Log and categorize spending to stay within budget"
  },
  {
    icon: Package,
    title: "Custom Packing List Generator",
    description: "Personalized packing lists based on destination and activities"
  },
  {
    icon: Share2,
    title: "Seamless Trip Sharing",
    description: "Share and collaborate on itineraries with friends and family"
  },
  {
    icon: Download,
    title: "Offline Access Capabilities",
    description: "Download itineraries and maps for offline use"
  },
  {
    icon: Sparkles,
    title: "Activity Recommendations",
    description: "Tailored suggestions based on interests and destinations"
  },
  {
    icon: Cloud,
    title: "Weather Forecast Integration",
    description: "Local weather forecasts for better planning"
  },
  {
    icon: FileText,
    title: "Travel Document Storage",
    description: "Securely store tickets, confirmations, and IDs"
  },
  {
    icon: Star,
    title: "Feedback and Review System",
    description: "Leave reviews and share experiences with the community"
  }
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/60 text-white py-12 sm:py-16 md:py-20 px-4">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Your Ultimate Travel Companion
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 px-2">
              Making trip planning effortless, organized, and enjoyable for every traveler.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                Start Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-sm sm:text-base bg-transparent text-white border-2 border-white hover:bg-white/20 font-semibold"
                onClick={() => navigate("/")}
              >
                Explore Destinations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Everything You Need</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Comprehensive tools to make your travel planning seamless and enjoyable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 sm:p-5 md:p-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1.5 sm:mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      {/* CTA Section - FIXED with proper contrast */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary to-primary/60 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-4">
              Join thousands of travelers who have simplified their trip planning
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto text-sm sm:text-base bg-white text-primary hover:bg-white/90 font-semibold"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-sm sm:text-base bg-transparent text-white border-2 border-white hover:bg-white/20 font-semibold"
                onClick={() => navigate("/")}
              >
                Explore Destinations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}