
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "@/contexts/AuthContext";

export default function Layout() {
  const { user, signOut } = useAuth();

  // A simple way to handle logout, you might want to move this logic
  const handleLogout = () => {
    signOut();
    // Maybe redirect to homepage or login page after logout
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header user={user} handleLogout={handleLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
