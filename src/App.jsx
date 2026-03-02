
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthProvider from "./context/AuthContext"
import ThemeProvider from "./context/ThemeContext"
import { NotificationProvider } from "./context/NotificationContext" // Fixed import path
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"

// Public Pages
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"

// Protected User Pages
import Dashboard from "./pages/Dashboard"
import UserDashboard from "./pages/UserDashboard"
import LocationDetails from "./pages/LocationDetails"
import PlaceDetails from "./pages/PlaceDetails"
import BookingHistory from "./pages/BookingHistory"
import Itinerary from "./pages/Itinerary"
import MapView from "./pages/MapView"
import Expenses from "./pages/Expenses"
import PackingList from "./pages/PackingList"
import Documents from "./pages/Documents"
import Wishlist from "./pages/Wishlist"
import Settings from "./pages/Settings"
import Help from "./pages/Help"

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider> {/* Add NotificationProvider here */}
            <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300 flex">
              {/* Sidebar - only shown for authenticated users */}
              <Routes>
                <Route path="*" element={
                  <ProtectedRoute>
                    <Sidebar />
                  </ProtectedRoute>
                } />
              </Routes>

              {/* Main Content */}
              <div className="flex-1">
                <Navbar />
                <main className="p-4 md:p-6">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected User Routes */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/user-dashboard" element={
                      <ProtectedRoute>
                        <UserDashboard />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/place/:name" element={
                      <ProtectedRoute>
                        <PlaceDetails />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/location" element={
                      <ProtectedRoute>
                        <LocationDetails />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/bookings" element={
                      <ProtectedRoute>
                        <BookingHistory />
                      </ProtectedRoute>
                    } />
                    <Route path="/itinerary" element={
                      <ProtectedRoute>
                        <Itinerary />
                      </ProtectedRoute>
                    } />
                    <Route path="/map" element={
                      <ProtectedRoute>
                        <MapView />
                      </ProtectedRoute>
                    } />
                    <Route path="/expenses" element={
                      <ProtectedRoute>
                        <Expenses />
                      </ProtectedRoute>
                    } />
                    <Route path="/packing" element={
                      <ProtectedRoute>
                        <PackingList />
                      </ProtectedRoute>
                    } />
                    <Route path="/documents" element={
                      <ProtectedRoute>
                        <Documents />
                      </ProtectedRoute>
                    } />
                    <Route path="/wishlist" element={
                      <ProtectedRoute>
                        <Wishlist />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } />
                    <Route path="/help" element={
                      <ProtectedRoute>
                        <Help />
                      </ProtectedRoute>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin" element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } />
                    <Route path="/admin/*" element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } />

                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </NotificationProvider> {/* Close NotificationProvider */}
        </ThemeProvider>
      </AuthProvider>
    </Router>
  )
}

export default App