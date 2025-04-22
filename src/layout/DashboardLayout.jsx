import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
    
    return (
        <div>
          <Sidebar />
          <div>
            <Navbar />
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      );
}