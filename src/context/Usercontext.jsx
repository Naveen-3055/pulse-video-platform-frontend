import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config/env';

// Step 1: create context
export const userDataContext = createContext();

function Usercontext({ children }) {
  const [user, setUser] = useState(null); 

  // step 1: track backend validation
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // step 2: calling api
        const res = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true
        });

        // step 3: update state and store in local storage.
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));

      } catch (err) {
        setUser(null);
        localStorage.removeItem('user');
        
      } finally {
        setLoading(false); // important
      }
    };

    // call the function.
    fetchUser();
  }, []);

  const value = { user, setUser, loading };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default Usercontext;
