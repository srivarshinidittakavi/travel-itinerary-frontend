// src/pages/Expenses.jsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import { expensesApi, tripsApi } from "@/services/api"
import {
  DollarSign,
  Plane,
  Hotel,
  Utensils,
  Car,
  ShoppingBag,
  Ticket,
  Plus,
  Trash2,
  Edit,
  Calendar
} from "lucide-react"

const categories = [
  { id: "flights", label: "Flights", icon: Plane, color: "blue" },
  { id: "accommodation", label: "Accommodation", icon: Hotel, color: "purple" },
  { id: "food", label: "Food & Dining", icon: Utensils, color: "orange" },
  { id: "transport", label: "Transport", icon: Car, color: "green" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "pink" },
  { id: "activities", label: "Activities", icon: Ticket, color: "red" },
]

export default function Expenses() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [trips, setTrips] = useState([])
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "flights",
    date: new Date().toISOString().split('T')[0],
    trip_id: null
  })
  const [editingId, setEditingId] = useState(null)
  const [budget, setBudget] = useState(5000)
  const [loading, setLoading] = useState(true)

  // Fetch trips when user is available
  useEffect(() => {
    const fetchTrips = async () => {
      if (!user?.id) {
        setLoading(false)
        return
      }
      
      try {
        setLoading(true)
        const userTrips = await tripsApi.getUserTrips(user.id)
        setTrips(Array.isArray(userTrips) ? userTrips : [])
        if (Array.isArray(userTrips) && userTrips.length > 0) {
          setSelectedTrip(userTrips[0].id)
          setNewExpense(prev => ({ ...prev, trip_id: userTrips[0].id }))
        }
      } catch (error) {
        console.error("Error fetching trips:", error)
        setTrips([])
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [user?.id])

  // Fetch expenses when selected trip changes
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!selectedTrip) return
      
      try {
        setLoading(true)
        const tripExpenses = await expensesApi.getTripExpenses(selectedTrip)
        setExpenses(Array.isArray(tripExpenses) ? tripExpenses : [])
      } catch (error) {
        console.error("Error fetching expenses:", error)
        setExpenses([])
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [selectedTrip])

  // Load budget from localStorage
  useEffect(() => {
    const savedBudget = localStorage.getItem("budget")
    if (savedBudget) setBudget(parseInt(savedBudget))
  }, [])

  // Save budget to localStorage
  useEffect(() => {
    localStorage.setItem("budget", budget.toString())
  }, [budget])

  const addExpense = async () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.trip_id) return

    try {
      if (editingId) {
        setExpenses(expenses.map(exp => 
          exp.id === editingId ? { 
            ...exp, 
            ...newExpense, 
            amount: parseFloat(newExpense.amount) 
          } : exp
        ))
        setEditingId(null)
      } else {
        const response = await expensesApi.addExpense({
          trip_id: newExpense.trip_id,
          category: newExpense.category,
          amount: parseFloat(newExpense.amount),
          description: newExpense.description,
          date: newExpense.date
        })
        
        const newExpenseData = Array.isArray(response) ? response[0] : response
        setExpenses([...expenses, newExpenseData])
      }

      setNewExpense({
        description: "",
        amount: "",
        category: "flights",
        date: new Date().toISOString().split('T')[0],
        trip_id: selectedTrip
      })
    } catch (error) {
      console.error("Error adding expense:", error)
      alert("Failed to add expense. Please try again.")
    }
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const editExpense = (expense) => {
    setNewExpense({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
      trip_id: expense.trip_id
    })
    setEditingId(expense.id)
  }

  const totalSpent = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0)
  const remaining = budget - totalSpent
  const progress = totalSpent > 0 ? (totalSpent / budget) * 100 : 0

  const getCategoryTotal = (categoryId) => {
    return expenses
      .filter(exp => exp.category === categoryId)
      .reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0)
  }

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    const Icon = category?.icon || DollarSign
    return <Icon className="w-4 h-4" />
  }

  const groupedByDate = expenses.reduce((groups, expense) => {
    const date = expense.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(expense)
    return groups
  }, {})

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading expenses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Keep track of your travel expenses
          </p>
        </div>
      </div>

      {/* Trip Selector */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <Label htmlFor="trip">Select Trip</Label>
          <Select
            value={selectedTrip}
            onValueChange={(value) => {
              setSelectedTrip(value)
              setNewExpense(prev => ({ ...prev, trip_id: value }))
            }}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Choose a trip" />
            </SelectTrigger>
            <SelectContent>
              {trips.length > 0 ? (
                trips.map(trip => (
                  <SelectItem key={trip.id} value={trip.id}>
                    {trip.title || 'Untitled Trip'} - {trip.destination || 'Unknown Destination'}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>No trips available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedTrip ? (
        <>
          {/* Budget Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 mb-1">Total Budget</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">${budget}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const newBudget = prompt("Enter new budget:", budget)
                      if (newBudget && !isNaN(parseInt(newBudget))) {
                        setBudget(parseInt(newBudget))
                      }
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-primary">${totalSpent.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 mb-1">Remaining</p>
                <p className={`text-3xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${remaining.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Budget Used</span>
                <span className="text-sm font-medium">{progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    progress > 100 ? 'bg-red-500' : 'bg-primary'
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Expense Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Expense' : 'Add New Expense'}
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    placeholder="e.g., Dinner at restaurant"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            <cat.icon className="w-4 h-4" />
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={addExpense} className="gap-2">
                  <Plus className="w-4 h-4" />
                  {editingId ? 'Update Expense' : 'Add Expense'}
                </Button>
                {editingId && (
                  <Button variant="outline" onClick={() => {
                    setEditingId(null)
                    setNewExpense({
                      description: "",
                      amount: "",
                      category: "flights",
                      date: new Date().toISOString().split('T')[0],
                      trip_id: selectedTrip
                    })
                  }}>
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different views */}
          <Tabs defaultValue="list" className="space-y-6">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <Card>
                <CardContent className="p-6">
                  {expenses.length > 0 ? (
                    <div className="space-y-4">
                      {expenses.map((expense) => (
                        <motion.div
                          key={expense.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                              {getCategoryIcon(expense.category)}
                            </div>
                            <div>
                              <p className="font-medium">{expense.description}</p>
                              <p className="text-sm text-gray-500">
                                {expense.date} • {categories.find(c => c.id === expense.category)?.label}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold">${parseFloat(expense.amount).toFixed(2)}</span>
                            <Button variant="ghost" size="icon" onClick={() => editExpense(expense)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteExpense(expense.id)}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">No expenses added yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {categories.map((category) => {
                      const total = getCategoryTotal(category.id)
                      const Icon = category.icon
                      return (
                        <div key={category.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-5 h-5 text-${category.color}-500`} />
                              <span className="font-medium">{category.label}</span>
                            </div>
                            <Badge variant="outline">${total.toFixed(2)}</Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`bg-${category.color}-500 h-2 rounded-full`}
                              style={{ width: `${totalSpent > 0 ? (total / totalSpent) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar">
              <Card>
                <CardContent className="p-6">
                  {Object.keys(groupedByDate).length > 0 ? (
                    <div className="space-y-6">
                      {Object.entries(groupedByDate)
                        .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                        .map(([date, dayExpenses]) => (
                          <div key={date}>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(date).toLocaleDateString(undefined, { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </h3>
                            <div className="space-y-2">
                              {dayExpenses.map(expense => (
                                <div key={expense.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                  <span>{expense.description}</span>
                                  <span className="font-medium">${parseFloat(expense.amount).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No expenses to display</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No Trips Found</h3>
            <p className="text-gray-500 mb-4">Create a trip first to start tracking expenses</p>
            <Button onClick={() => navigate("/")}>Plan a Trip</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}