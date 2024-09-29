import Navbar from "../components/DashBoard/Navbar/Navabar";
import { auth } from "../firebase/Firebase";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        toast.error("You must be logged in to view this page");
        navigate("/authenticate");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};
