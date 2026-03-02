import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Clock,
  Plus,
  Trash2,
  Edit,
  Sun,
  Cloud,
  CloudRain,
  Navigation,
  CheckCircle,
  Circle
} from "lucide-react"

export default function Itinerary() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [itinerary, setItinerary] = useState({})
  const [newActivity, setNewActivity] = useState({
    time: "",
    title: "",
    description: "",
    location: "",
    completed: false
  })
  const [editingId, setEditingId] = useState(null)

  // Sample data
  const sampleItinerary = {
    "2024-03-15": [
      {
        id: 1,
        time: "09:00",
        title: "Breakfast at Hotel",
        description: "Enjoy complimentary breakfast",
        location: "Hotel Restaurant",
        completed: true
      },
      {
        id: 2,
        time: "10:30",
        title: "Visit Eiffel Tower",
        description: "Skip-the-line ticket booked",
        location: "Eiffel Tower",
        completed: false
      },
      {
        id: 3,
        time: "13:00",
        title: "Lunch at Le Jules Verne",
        description: "Restaurant in Eiffel Tower",
        location: "Eiffel Tower",
        completed: false
      }
    ]
  }

  useState(() => {
    setItinerary(sampleItinerary)
  }, [])

  const addActivity = () => {
    if (!newActivity.time || !newActivity.title) return

    const dayActivities = itinerary[selectedDate] || []
    const newId = Date.now()

    setItinerary({
      ...itinerary,
      [selectedDate]: [...dayActivities, { ...newActivity, id: newId }]
    })

    setNewActivity({
      time: "",
      title: "",
      description: "",
      location: "",
      completed: false
    })
  }

  const deleteActivity = (activityId) => {
    const updatedActivities = itinerary[selectedDate].filter(a => a.id !== activityId)
    setItinerary({
      ...itinerary,
      [selectedDate]: updatedActivities
    })
  }

  const toggleComplete = (activityId) => {
    const updatedActivities = itinerary[selectedDate].map(a =>
      a.id === activityId ? { ...a, completed: !a.completed } : a
    )
    setItinerary({
      ...itinerary,
      [selectedDate]: updatedActivities
    })
  }

  const getWeatherIcon = () => {
    const icons = [Sun, Cloud, CloudRain]
    const RandomIcon = icons[Math.floor(Math.random() * icons.length)]
    return <RandomIcon className="w-5 h-5" />
  }

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split('T')[0]
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Itinerary Planner</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Plan your day-by-day activities
        </p>
      </div>

      {/* Date Selector */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Select Date</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((date) => {
            const isSelected = date === selectedDate
            const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
            const dayNumber = new Date(date).getDate()
            
            return (
              <motion.button
                key={date}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDate(date)}
                className={`
                  flex flex-col items-center p-4 min-w-[100px] rounded-xl transition-all
                  ${isSelected 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className="text-sm">{dayName}</span>
                <span className="text-2xl font-bold">{dayNumber}</span>
                <div className="mt-1">{getWeatherIcon()}</div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Add Activity Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Activity' : 'Add New Activity'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Time</label>
              <Input
                type="time"
                value={newActivity.time}
                onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input
                placeholder="Activity title"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <Input
                placeholder="Location"
                value={newActivity.location}
                onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                placeholder="Activity description"
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={addActivity} className="mt-4 gap-2">
            <Plus className="w-4 h-4" />
            Add to Itinerary
          </Button>
        </CardContent>
      </Card>

      {/* Itinerary Timeline */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <Badge variant="outline" className="gap-1">
              <Clock className="w-4 h-4" />
              {itinerary[selectedDate]?.length || 0} activities
            </Badge>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-6">
              <AnimatePresence>
                {itinerary[selectedDate]?.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Timeline dot */}
                    <div 
                      className={`absolute left-3 w-3 h-3 rounded-full -translate-x-1.5 mt-1.5
                        ${activity.completed 
                          ? 'bg-green-500' 
                          : 'bg-primary'
                        }`}
                    />

                    <Card className={`${activity.completed ? 'opacity-75' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline" className="font-mono">
                                {activity.time}
                              </Badge>
                              <h3 className="font-semibold">{activity.title}</h3>
                              {activity.completed && (
                                <Badge className="bg-green-100 text-green-800">Completed</Badge>
                              )}
                            </div>
                            
                            {activity.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {activity.description}
                              </p>
                            )}
                            
                            {activity.location && (
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <MapPin className="w-4 h-4" />
                                {activity.location}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleComplete(activity.id)}
                            >
                              {activity.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Circle className="w-4 h-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => deleteActivity(activity.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {(!itinerary[selectedDate] || itinerary[selectedDate].length === 0) && (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No activities planned for this day</p>
                  <Button variant="link" onClick={() => document.querySelector('input').focus()}>
                    Add your first activity
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}