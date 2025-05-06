import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { prodUri } from "../constant";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user = { name, email, isAdmin }
  const [loading, setLoading] = useState(true);

  // Auto-fetch user when app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${prodUri}api/auth/profile`, { withCredentials: true });
        setUser(data);
      }catch(err){
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };
  

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Easy hook
export const useUser = () => useContext(UserContext);
