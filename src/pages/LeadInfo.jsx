import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Adjust the path to match your structure
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import FollowUp from "../components/FollowUp"; // Importing the FollowUp component

const LeadInfo = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();

  const [leadData, setLeadData] = useState({
    clientName: "",
    clientPhone: "",
    lookingFor: "",
    condition: "",
    type: "",
    dealCondition: "",
    visitCondition: "",
    leadStatus: "",
    comments: "",
    date: "", // Existing date field in Firebase
  });

  // Fetch lead data from Firebase
  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const leadRef = doc(db, "leads", leadId);
        const leadSnap = await getDoc(leadRef);
        if (leadSnap.exists()) {
          const data = leadSnap.data();
          // Set the data including the existing date field
          setLeadData({
            ...data,
            date: data.date || "", // Ensure date field exists in the fetched data
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching lead data:", error);
      }
    };

    fetchLeadData();
  }, [leadId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle lead update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedLeadData = {
      ...leadData,
      // Update the date field with the current date
      date: new Date().toLocaleDateString(), // Format the date as needed
    };

    try {
      const leadRef = doc(db, "leads", leadId);
      await updateDoc(leadRef, updatedLeadData);
      alert("Lead updated successfully!");
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  // Handle lead deletion
  const handleDeleteLead = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lead?");
    if (confirmDelete) {
      try {
        const leadRef = doc(db, "leads", leadId);
        await deleteDoc(leadRef);
        navigate("/"); // Navigate back after deletion
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

  // Inline Styles
  const formContainerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#333",
    color: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const formGroupStyle = {
    marginBottom: "15px",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
    color: "#ffa500", // Orange color for labels
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#444", // Dark background for inputs
    color: "white",
  };

  const selectStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#444", // Dark background for selects
    color: "white",
  };

  const buttonStyle = {
    backgroundColor: "#ffa500", // Orange background
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={formContainerStyle}>
      <h2>Edit Lead</h2>
      <button onClick={handleDeleteLead} style={{ ...buttonStyle, backgroundColor: "#ff4d4d", marginBottom: "20px" }}>
        Delete Lead
      </button>
      <form onSubmit={handleUpdate}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Client Name:</label>
          <input type="text"
            name="clientName"
            value={leadData.clientName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Client Phone Number (Primary):</label>
          <input
            type="text"
            name="clientPhone"
            value={leadData.clientPhone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Looking For:</label>
          <select
            name="lookingFor"
            value={leadData.lookingFor}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="">Select Looking For</option>
            <option value="2Bhk">2Bhk</option>
            <option value="3Bhk">3Bhk</option>
            <option value="4Bhk">4Bhk</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Condition:</label>
          <select
            name="condition"
            value={leadData.condition}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="">Select Condition</option>
            <option value="Furnished">Furnished</option>
            <option value="Un-Furnished">Un-Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="UnderConstruction">Under Construction</option>
            <option value="Ready to move">Ready to move</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Type:</label>
          <select
            name="type"
            value={leadData.type}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="">Select Type</option>
            <option value="Residential">Residential</option>
            <option value="Shop">Shop</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Deal Condition:</label>
          <select
            name="dealCondition"
            value={leadData.dealCondition}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="">Select Deal Condition</option>
            <option value="Done">Done</option>
            <option value="Want More Options">Want More Options</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Visit Condition:</label>
          <select
            name="visitCondition"
            value={leadData.visitCondition}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="">Select Visit Condition</option>
            <option value="Pending">Pending</option>
            <option value="Visited">Visited</option>
            <option value="Not Applicable">Not Applicable</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Lead Status:</label>
          <select
            name="leadStatus"
            value={leadData.leadStatus}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="">Select Lead Status</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="FOLLOW UP">FOLLOW UP</option>
            <option value="LOST">LOST</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Comments:</label>
          <textarea
            name="comments"
            value={leadData.comments}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <button type="submit" style={buttonStyle}>Update Lead</button>
        </div>
      </form>
      {/* Add the FollowUp component below the form */}
      <FollowUp leadId={leadId} />
    </div>
  );
};

export default LeadInfo;
