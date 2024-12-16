import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Adjust the path to match your structure
import { doc, getDoc, updateDoc } from "firebase/firestore";

const FollowUp = ({ leadId }) => {
  const [followUps, setFollowUps] = useState([]); // Store the follow-ups
  const [followUpData, setFollowUpData] = useState({
    comments: "",
    date: "",
    time: "",
    type: "",
  });
  const [showForm, setShowForm] = useState(false); // Toggle for showing the form
  const [expandedFollowUp, setExpandedFollowUp] = useState(null); // To manage expanded state
  const [combineComment, setCombineComment] = useState(false); // Toggle for combining follow-up comment with main comment

  // Fetch follow-ups from Firebase
  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const leadRef = doc(db, "leads", leadId);
        const leadSnap = await getDoc(leadRef);
        if (leadSnap.exists()) {
          const data = leadSnap.data();
          setFollowUps(data.followUps || []); // Set follow-ups from Firebase or empty array
        }
      } catch (error) {
        console.error("Error fetching follow-ups:", error);
      }
    };

    fetchFollowUps();
  }, [leadId]);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFollowUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add a new follow-up
  const handleAddFollowUp = async (e) => {
    e.preventDefault();
    const newFollowUp = {
      comments: followUpData.comments,
      date: followUpData.date,
      time: followUpData.time,
      type: followUpData.type,
      srNo: followUps.length + 1,
    };

    try {
      const leadRef = doc(db, "leads", leadId);
      await updateDoc(leadRef, {
        followUps: [...followUps, newFollowUp],
      });
      setFollowUps((prev) => [...prev, newFollowUp]);
      setFollowUpData({ comments: "", date: "", time: "", type: "" });
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error("Error adding follow-up:", error);
    }
  };

  // Toggle the expanded view for a specific follow-up
  const handleExpand = (index) => {
    if (expandedFollowUp === index) {
      setExpandedFollowUp(null); // Collapse the follow-up if already expanded
    } else {
      setExpandedFollowUp(index); // Expand the clicked follow-up
    }
  };

  // Handle delete follow-up
  const handleDelete = async (index) => {
    const updatedFollowUps = followUps.filter((_, i) => i !== index);
    try {
      const leadRef = doc(db, "leads", leadId);
      await updateDoc(leadRef, {
        followUps: updatedFollowUps,
      });
      setFollowUps(updatedFollowUps);
    } catch (error) {
      console.error("Error deleting follow-up:", error);
    }
  };

  // Toggle combining follow-up comment to the main lead's comment
  const handleToggleCombineComment = () => {
    setCombineComment(!combineComment);
  };

  // Handle updating the main lead's comment if combine is toggled
  useEffect(() => {
    if (combineComment && followUpData.comments) {
      // Combine follow-up comment to the main lead's comment
      const combineCommentToLead = async () => {
        try {
          const leadRef = doc(db, "leads", leadId);
          const leadSnap = await getDoc(leadRef);
          if (leadSnap.exists()) {
            const leadData = leadSnap.data();
            const updatedComment = leadData.comments
              ? leadData.comments + "\n" + followUpData.comments
              : followUpData.comments;

            await updateDoc(leadRef, {
              comments: updatedComment,
            });
          }
        } catch (error) {
          console.error("Error combining comments:", error);
        }
      };

      combineCommentToLead();
    }
  }, [combineComment, followUpData.comments, leadId]);

  return (
    <div style={{ backgroundColor: "#333", color: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}>
      <h3>Follow-Up Section</h3>

      {/* Button to add a new follow-up */}
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          backgroundColor: "#6c63ff",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {showForm ? "Cancel" : "Add Follow-Up"}
      </button>

      {/* Form for adding a new follow-up */}
      {showForm && (
        <form onSubmit={handleAddFollowUp} style={{ marginTop: "20px" }}>
          <div>
            <label style={{ fontWeight: "bold" }}>Follow-Up Comments:</label>
            <textarea
              name="comments"
              value={followUpData.comments}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", margin: "10px 0", borderRadius: "5px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Follow-Up Date:</label>
            <input
              type="date"
              name="date"
              value={followUpData.date}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", margin: "10px 0", borderRadius: "5px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Follow-Up Time:</label>
            <input
              type="time"
              name="time"
              value={followUpData.time}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", margin: "10px 0", borderRadius: "5px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Follow-Up Type:</label>
            <select
              name="type"
              value={followUpData.type}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", margin: "10px 0", borderRadius: "5px" }}
            >
              <option value="">Select Type</option>
              <option value="CALL">CALL</option>
              <option value="MESSAGE">MESSAGE</option>
              <option value="VISIT">VISIT</option>
            </select>
          </div>

          {/* Toggle for combining follow-up comment to main comment */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={combineComment}
                onChange={handleToggleCombineComment}
                style={{ marginRight: "10px" }}
              />
              Combine the Follow-Up Comment to Main Comment
            </label>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Follow-Up
          </button>
        </form>
      )}

      {/* Display the follow-up data */}
      <div style={{ marginTop: "20px" }}>
        {followUps.length === 0 ? (
          <p>No follow-ups yet.</p>
        ) : (
          followUps.map((followUp, index) => (
            <div key={index} style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#444", borderRadius: "5px" }}>
              <div
                onClick={() => handleExpand(index)}
                style={{
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                <strong>{followUp.srNo}. {followUp.date} {followUp.time && `at ${followUp.time}`}</strong>
                {expandedFollowUp === index ? " -" : " +"}
              </div>

              {/* Show expanded details */}
              {expandedFollowUp === index && (
                <div style={{ marginTop: "10px" }}>
                  <p><strong>Comments:</strong> {followUp.comments}</p>
                  <p><strong>Type:</strong> {followUp.type}</p>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowUp;
