import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export  const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = getCookie("token");
    if (!token) return;
    console.log("Fetching user with token:", token);

    fetch(`${API_BASE_URL}/api/users-app/profile/me`, {
      headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
