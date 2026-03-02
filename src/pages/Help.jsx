// pages/Help.jsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Video,
  FileText,
  Users,
  LifeBuoy,
  Send
} from "lucide-react"

const faqs = [
  {
    category: "Bookings",
    questions: [
      {
        q: "How do I book a trip?",
        a: "To book a trip, browse destinations, select your preferred dates and hotel, then click 'Book Now'. You'll receive a confirmation email with your booking details."
      },
      {
        q: "Can I cancel my booking?",
        a: "Yes, you can cancel bookings from your dashboard. Cancellation policies vary by hotel and date. Free cancellation is available for most bookings up to 24 hours before check-in."
      },
      {
        q: "How do I modify my booking?",
        a: "Go to 'My Bookings' in your dashboard, select the booking you want to modify, and click 'Edit'. You can change dates, number of guests, or hotel."
      }
    ]
  },
  {
    category: "Payments",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely."
      },
      {
        q: "When will I be charged?",
        a: "Most hotels charge at the time of booking. Some offer pay-at-hotel options. Check the booking details for specific payment terms."
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, we use industry-standard encryption to protect your payment information. We never store your full credit card details on our servers."
      }
    ]
  },
  {
    category: "Account",
    questions: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page. We'll send you an email with instructions to reset your password."
      },
      {
        q: "Can I have multiple travelers on one account?",
        a: "Yes, you can save multiple traveler profiles in your account settings for faster booking."
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings > Danger Zone and click 'Delete Account'. This action is permanent and cannot be undone."
      }
    ]
  }
]

const guides = [
  {
    title: "Getting Started",
    description: "Learn the basics of using TravelPlanner",
    icon: BookOpen,
    articles: 5
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step video guides",
    icon: Video,
    articles: 8
  },
  {
    title: "Travel Tips",
    description: "Expert advice for better travel",
    icon: FileText,
    articles: 12
  },
  {
    title: "Community Forum",
    description: "Ask other travelers",
    icon: Users,
    articles: "Active"
  }
]

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    alert("Thank you for your message! We'll get back to you soon.")
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Find answers to common questions or get in touch with our support team
        </p>
      </div>

      {/* Search */}
      <Card className="max-w-2xl mx-auto mb-12">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Guides */}
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        {guides.map((guide, index) => {
          const Icon = guide.icon
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{guide.description}</p>
                  <Badge variant="outline">{guide.articles} articles</Badge>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((category, catIndex) => (
              <Card key={catIndex}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = `${catIndex}-${faqIndex}`
                      return (
                        <div key={faqIndex} className="border rounded-lg">
                          <button
                            onClick={() => toggleFaq(globalIndex)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left"
                          >
                            <span className="font-medium">{faq.q}</span>
                            {openFaq === globalIndex ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          <AnimatePresence>
                            {openFaq === globalIndex && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-3 text-gray-600 dark:text-gray-300"
                              >
                                {faq.a}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Still need help?</h3>
              
              <div className="space-y-4 mb-6">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                  Live Chat
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Mail className="w-4 h-4" />
                  Email Support
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Phone className="w-4 h-4" />
                  Call Us
                </Button>
              </div>

              <Separator className="my-4" />

              <h4 className="font-medium mb-3">Contact Form</h4>
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Your message"
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                />
                <Button type="submit" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                We typically respond within 24 hours
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}