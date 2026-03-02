// pages/PackingList.jsx
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Circle,
  Sun,
  Cloud,
  Umbrella,
  Thermometer,
  Shirt,
  Footprints,
  Camera,
  Smartphone,
  CreditCard,
  FileText,
  Heart,
  Share2,
  Download
} from "lucide-react"

const categories = [
  { id: "clothing", label: "Clothing", icon: Shirt },
  { id: "footwear", label: "Footwear", icon: Footprints },
  { id: "electronics", label: "Electronics", icon: Smartphone },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "toiletries", label: "Toiletries", icon: Heart },
  { id: "other", label: "Other", icon: Package }
]

const defaultItems = {
  clothing: [
    { id: 1, name: "T-shirts", category: "clothing", essential: true },
    { id: 2, name: "Jeans/Pants", category: "clothing", essential: true },
    { id: 3, name: "Underwear", category: "clothing", essential: true },
    { id: 4, name: "Socks", category: "clothing", essential: true },
    { id: 5, name: "Sleepwear", category: "clothing", essential: false },
    { id: 6, name: "Swimwear", category: "clothing", essential: false }
  ],
  footwear: [
    { id: 7, name: "Comfortable walking shoes", category: "footwear", essential: true },
    { id: 8, name: "Flip-flops", category: "footwear", essential: false },
    { id: 9, name: "Formal shoes", category: "footwear", essential: false }
  ],
  electronics: [
    { id: 10, name: "Phone charger", category: "electronics", essential: true },
    { id: 11, name: "Power bank", category: "electronics", essential: true },
    { id: 12, name: "Adapter/Converter", category: "electronics", essential: true },
    { id: 13, name: "Camera", category: "electronics", essential: false },
    { id: 14, name: "Headphones", category: "electronics", essential: false }
  ],
  documents: [
    { id: 15, name: "Passport", category: "documents", essential: true },
    { id: 16, name: "Visa", category: "documents", essential: true },
    { id: 17, name: "Flight tickets", category: "documents", essential: true },
    { id: 18, name: "Hotel confirmations", category: "documents", essential: true },
    { id: 19, name: "Travel insurance", category: "documents", essential: true },
    { id: 20, name: "Driver's license", category: "documents", essential: false }
  ],
  toiletries: [
    { id: 21, name: "Toothbrush & toothpaste", category: "toiletries", essential: true },
    { id: 22, name: "Shampoo & conditioner", category: "toiletries", essential: true },
    { id: 23, name: "Deodorant", category: "toiletries", essential: true },
    { id: 24, name: "Sunscreen", category: "toiletries", essential: false },
    { id: 25, name: "First aid kit", category: "toiletries", essential: false }
  ],
  other: [
    { id: 26, name: "Travel pillow", category: "other", essential: false },
    { id: 27, name: "Eye mask", category: "other", essential: false },
    { id: 28, name: "Earplugs", category: "other", essential: false },
    { id: 29, name: "Reusable water bottle", category: "other", essential: false }
  ]
}

export default function PackingList() {
  const [items, setItems] = useState({})
  const [packedItems, setPackedItems] = useState([])
  const [newItem, setNewItem] = useState({ name: "", category: "clothing" })
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState(7)
  const [weather, setWeather] = useState("warm")

  useEffect(() => {
    // Load from localStorage or use defaults
    const savedItems = localStorage.getItem("packingList")
    const savedPacked = localStorage.getItem("packedItems")
    
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      setItems(defaultItems)
    }
    
    if (savedPacked) {
      setPackedItems(JSON.parse(savedPacked))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("packingList", JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem("packedItems", JSON.stringify(packedItems))
  }, [packedItems])

  const toggleItem = (itemId) => {
    if (packedItems.includes(itemId)) {
      setPackedItems(packedItems.filter(id => id !== itemId))
    } else {
      setPackedItems([...packedItems, itemId])
    }
  }

  const addItem = () => {
    if (!newItem.name.trim()) return

    const newId = Date.now()
    const updatedItems = { ...items }
    
    if (!updatedItems[newItem.category]) {
      updatedItems[newItem.category] = []
    }
    
    updatedItems[newItem.category].push({
      id: newId,
      name: newItem.name,
      category: newItem.category,
      essential: false
    })
    
    setItems(updatedItems)
    setNewItem({ name: "", category: "clothing" })
  }

  const deleteItem = (category, itemId) => {
    const updatedItems = { ...items }
    updatedItems[category] = updatedItems[category].filter(item => item.id !== itemId)
    setItems(updatedItems)
    setPackedItems(packedItems.filter(id => id !== itemId))
  }

  const totalItems = Object.values(items).flat().length
  const packedCount = packedItems.length
  const progress = totalItems > 0 ? (packedCount / totalItems) * 100 : 0

  const getWeatherIcon = () => {
    switch(weather) {
      case 'hot': return <Sun className="w-5 h-5 text-yellow-500" />
      case 'warm': return <Cloud className="w-5 h-5 text-gray-500" />
      case 'cold': return <Thermometer className="w-5 h-5 text-blue-500" />
      case 'rainy': return <Umbrella className="w-5 h-5 text-blue-400" />
      default: return <Sun className="w-5 h-5" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Packing List</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create and manage your packing list
          </p>
        </div>
      </div>

      {/* Trip Details */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Destination</label>
              <Input
                placeholder="e.g., Paris, France"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Duration (days)</label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Weather</label>
              <select 
                className="w-full p-2 border rounded-md dark:bg-gray-800"
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
              >
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
                <option value="rainy">Rainy</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Packing Progress</span>
            <span className="text-sm">{packedCount}/{totalItems} items packed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Add New Item */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Add New Item</h3>
          <div className="flex gap-3">
            <Input
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="flex-1"
            />
            <select 
              className="w-40 p-2 border rounded-md dark:bg-gray-800"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <Button onClick={addItem} className="gap-2">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories Tabs */}
      <Tabs defaultValue="clothing" className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {categories.map(category => {
            const Icon = category.icon
            return (
              <TabsTrigger key={category.id} value={category.id} className="gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{category.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{category.label}</h3>
                  <Badge variant="outline">
                    {items[category.id]?.filter(i => packedItems.includes(i.id)).length || 0}/{items[category.id]?.length || 0} packed
                  </Badge>
                </div>

                <div className="space-y-3">
                  {items[category.id]?.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={packedItems.includes(item.id)}
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                        <label
                          htmlFor={`item-${item.id}`}
                          className={`flex-1 cursor-pointer ${
                            packedItems.includes(item.id) ? 'line-through text-gray-400' : ''
                          }`}
                        >
                          {item.name}
                          {item.essential && (
                            <Badge className="ml-2 bg-red-100 text-red-800">Essential</Badge>
                          )}
                        </label>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteItem(category.id, item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </motion.div>
                  ))}

                  {(!items[category.id] || items[category.id].length === 0) && (
                    <p className="text-center text-gray-500 py-4">
                      No items in this category
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Actions */}
      <div className="flex gap-2 mt-6">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download List
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  )
}