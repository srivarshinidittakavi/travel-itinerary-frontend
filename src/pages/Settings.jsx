// pages/Settings.jsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import {
  User,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Moon,
  Sun,
  Mail,
  Phone,
  MapPin,
  Save,
  LogOut,
  Trash2,
  Languages,
  DollarSign,
  Clock
} from "lucide-react"

export default function Settings() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: ""
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    promotions: false
  })
  const [preferences, setPreferences] = useState({
    currency: "USD",
    language: "English",
    timezone: "UTC",
    distanceUnit: "km"
  })

  useEffect(() => {
    // Load saved settings from localStorage
    const savedProfile = localStorage.getItem("userProfile")
    const savedNotifications = localStorage.getItem("notificationSettings")
    const savedPreferences = localStorage.getItem("userPreferences")

    if (savedProfile) setProfile(JSON.parse(savedProfile))
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
    if (savedPreferences) setPreferences(JSON.parse(savedPreferences))
  }, [])

  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile))
    alert("Profile updated successfully!")
  }

  const saveNotifications = () => {
    localStorage.setItem("notificationSettings", JSON.stringify(notifications))
    alert("Notification settings saved!")
  }

  const savePreferences = () => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences))
    alert("Preferences saved!")
  }

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.clear()
      logout()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-4">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Shield className="w-4 h-4" />
                Privacy & Security
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Globe className="w-4 h-4" />
                Preferences
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start gap-2 text-red-600" onClick={logout}>
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full p-2 border rounded-md dark:bg-gray-800"
                      placeholder="Tell us a little about yourself..."
                    />
                  </div>

                  <Button onClick={saveProfile} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Promotional Emails</Label>
                        <p className="text-sm text-gray-500">Receive offers and promotions</p>
                      </div>
                      <Switch
                        checked={notifications.promotions}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                      />
                    </div>
                  </div>

                  <Button onClick={saveNotifications} className="mt-6 gap-2">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">User Preferences</h3>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <select
                          id="currency"
                          className="w-full p-2 border rounded-md dark:bg-gray-800"
                          value={preferences.currency}
                          onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="JPY">JPY (¥)</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="w-full p-2 border rounded-md dark:bg-gray-800"
                          value={preferences.language}
                          onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                          id="timezone"
                          className="w-full p-2 border rounded-md dark:bg-gray-800"
                          value={preferences.timezone}
                          onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                        >
                          <option value="UTC">UTC</option>
                          <option value="EST">EST</option>
                          <option value="PST">PST</option>
                          <option value="GMT">GMT</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="distance">Distance Unit</Label>
                        <select
                          id="distance"
                          className="w-full p-2 border rounded-md dark:bg-gray-800"
                          value={preferences.distanceUnit}
                          onChange={(e) => setPreferences({ ...preferences, distanceUnit: e.target.value })}
                        >
                          <option value="km">Kilometers (km)</option>
                          <option value="miles">Miles</option>
                        </select>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-gray-500">Toggle dark/light theme</p>
                      </div>
                      <Button variant="outline" size="icon" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button onClick={savePreferences} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="mt-4 border-red-200 dark:border-red-900">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                  <Button variant="destructive" onClick={deleteAccount} className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}