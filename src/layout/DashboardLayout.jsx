import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
    
    return (
        <>
          <Sidebar />
          <Navbar />
          <main>
            <Outlet />
          </main>
        </>
      );
}