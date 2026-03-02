import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}