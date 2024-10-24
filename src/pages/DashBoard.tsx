import Navbar from "../components/DashBoard/Navbar/Navabar";
import { auth } from "../firebase/Firebase";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
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
