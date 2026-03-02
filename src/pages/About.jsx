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

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108777-296fd5c5a9e9?w=400",
    bio: "Passionate traveler with 10+ years in the tourism industry"
  },
  {
    name: "Michael Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Full-stack developer specializing in travel tech"
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "Creating seamless and beautiful user experiences"
  }
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/60 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Ultimate Travel Companion
            </h1>
            <p className="text-xl mb-8 text-white/90">
              We're on a mission to make trip planning effortless, organized, and enjoyable for every traveler.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/register")}
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                TravelPlanner was born from a simple idea: travel planning shouldn't be stressful. Our founder, Sarah, experienced firsthand the chaos of juggling multiple bookings, documents, and plans during her dream vacation.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                She envisioned a single platform that could bring all travel information together, making it easy to organize, access, and share. That vision became TravelPlanner - your all-in-one travel companion.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we help thousands of travelers plan their perfect trips, from weekend getaways to round-the-world adventures.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800"
                alt="Travel planning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive tools to make your travel planning seamless and enjoyable
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate travelers and tech enthusiasts dedicated to making your journey better
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/60 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of travelers who have simplified their trip planning with TravelPlanner
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/register")}
              className="mr-4"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/20"
              onClick={() => navigate("/")}
            >
              Explore Destinations
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}