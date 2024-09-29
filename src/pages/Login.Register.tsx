import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import Registartion from "../components/Registration/Register";
import Login1 from "../components/Registration/Login1";

const Authoisation: React.FC = () => {
  const [authState, setAuthState] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(`/dashboard`);
      } else {
        setAuthState(true);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const toggleAuth = () => setAuthState((prev) => !prev);

  return (
    <>
      {authState ? (
        <Registartion toggleAuth={toggleAuth} />
      ) : (
        <Login1 toggleAuth={toggleAuth} />
      )}
    </>
  );
};

export default Authoisation;