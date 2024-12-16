import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Login from "./pages/login";
import Home from "./pages/home";
import AddLead from "./pages/addlead";
import LeadInfo from "./pages/LeadInfo";


// Private Route Component
const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/addlead"
          element={
            <PrivateRoute>
              <AddLead />
            </PrivateRoute>
          }
        />
        <Route
          path="/leadinfo/:leadId"
          element={
            <PrivateRoute>
              <LeadInfo />
            </PrivateRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
