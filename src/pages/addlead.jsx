import React, { useState } from "react";
import { db } from "../firebase/firebase"; // Adjust the path to match your structure
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddLeadForm = () => {
  const [date, setDate] = useState(""); // State for the date selector
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [condition, setCondition] = useState("");
  const [type, setType] = useState("");
  const [dealCondition, setDealCondition] = useState("");
  const [visitCondition, setVisitCondition] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [comments, setComments] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "leads"), {
        date,
        clientName,
        clientPhone,
        lookingFor,
        condition,
        type,
        dealCondition,
        visitCondition,
        leadStatus,
        comments,
      });
      // Redirect to the home page after adding the lead
      navigate("/");

      // Reset form fields
      setDate("");
      setClientName("");
      setClientPhone("");
      setLookingFor("");
      setCondition("");
      setType("");
      setDealCondition("");
      setVisitCondition("");
      setLeadStatus("");
      setComments("");
    } catch (error) {
      console.error("Error adding lead: ", error);
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
      <h2>Add New Lead</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Client Name:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Client Phone Number (Primary):</label>
          <input
            type="text"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Looking For:</label>
          <select
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
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
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">Select Condition</option>
            <option value="Furnished">Furnished</option>
            <option value="Un-Furnished">Un-Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="UnderConstruction">UnderConstruction</option>
            <option value="Ready to move">Ready to move</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
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
            value={dealCondition}
            onChange={(e) => setDealCondition(e.target.value)}
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
            value={visitCondition}
            onChange={(e) => setVisitCondition(e.target.value)}
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
            value={leadStatus}
            onChange={(e) => setLeadStatus(e.target.value)}
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
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <button type="submit" style={buttonStyle}>Add Lead</button>
        </div>
      </form>
    </div>
  );
};

export default AddLeadForm;
