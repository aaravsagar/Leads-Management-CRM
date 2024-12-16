import React, { useState, useEffect } from "react";
import LeadsTable from "../components/LeadsTable";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Home() {
  const [loading, setLoading] = useState(true); // Set loading state to true initially
  const navigate = useNavigate();

  const handleAddLead = () => {
    navigate("/addlead");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  // Simulate loading for 3 seconds (replace with real data fetching if necessary)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        {/* Loading Spinner */}
        <div style={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div style={styles.homeContainer}>
      {/* Add Lead Button */}
      <button onClick={handleAddLead} style={styles.addLeadBtn}>
        Add Lead
      </button>

      {/* Logout Button */}
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>

      {/* Leads Table */}
      <LeadsTable />
    </div>
  );
}

// Inline CSS styles
const styles = {
  homeContainer: {
    textAlign: "center",
    marginTop: "0",
    backgroundColor: "#333",
    color: "#fff",
    minHeight: "100vh",
    padding: "0",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
  },
  addLeadBtn: {
    position: "absolute",
    top: "20px",
    right: "120px",
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#444",
    color: "#f39c12",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(255, 255, 255, 0.3)",
    zIndex: 10,
  },
  logoutBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#444",
    color: "#f39c12",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(255, 255, 255, 0.3)",
    zIndex: 10,
  },
  loadingContainer: {
    textAlign: "center",
    marginTop: "0",
    backgroundColor: "#333",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #3498db",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 2s linear infinite",
  },
};

export default Home;
