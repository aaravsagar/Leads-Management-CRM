import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";

const LeadsTable = () => {
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [initialLeads, setInitialLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todayCalls, setTodayCalls] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const [missedCalls, setMissedCalls] = useState(0);
  const [missedVisits, setMissedVisits] = useState(0);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "leads"));
        const leadsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        leadsArray.sort((a, b) => new Date(a.date) - new Date(b.date));

        setInitialLeads(leadsArray);
        setFilteredLeads(leadsArray);

        // Call function to count follow-ups
        countFollowUps(leadsArray);
      } catch (error) {
        console.error("Error fetching leads: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const countFollowUps = (leads) => {
    let callsToday = 0;
    let visitsToday = 0;
    let missedCalls = 0;
    let missedVisits = 0;

    const currentDate = new Date();
    const todayDate = currentDate.toLocaleDateString();

    leads.forEach((lead) => {
      // Prioritize follow-up with highest srNo
      const latestFollowUp = lead.followUps
        ? lead.followUps.sort((a, b) => b.srNo - a.srNo)[0]
        : null;

      if (latestFollowUp) {
        const followUpDate = new Date(latestFollowUp.date);
        const followUpTime = latestFollowUp.time.split(":");
        followUpDate.setHours(parseInt(followUpTime[0]), parseInt(followUpTime[1]));

        // If follow-up is today
        if (followUpDate.toLocaleDateString() === todayDate) {
          if (latestFollowUp.type === "CALL") {
            callsToday++;
          } else if (latestFollowUp.type === "VISIT") {
            visitsToday++;
          }
        }

        // If follow-up is in the past (missed)
        if (followUpDate < currentDate) {
          if (latestFollowUp.type === "CALL") {
            missedCalls++;
          } else if (latestFollowUp.type === "VISIT") {
            missedVisits++;
          }
        }
      }
    });

    setTodayCalls(callsToday);
    setTodayVisits(visitsToday);
    setMissedCalls(missedCalls);
    setMissedVisits(missedVisits);
  };

  const getLatestFollowUp = (lead) => {
    if (!lead.followUps || lead.followUps.length === 0) return null;

    return lead.followUps.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  };

  const getFollowUpStatus = (followUp) => {
    const followUpDate = new Date(followUp.date);
    const currentTime = new Date();

    if (followUpDate.toDateString() === currentTime.toDateString()) {
      return "green"; // Green dot for today's follow-up
    } else if (followUpDate < currentTime) {
      return "red"; // Red dot for past follow-up
    }
    return null; // No dot for future follow-up
  };

  const filterLeads = () => {
    let filtered = [...initialLeads];

    if (statusFilter) {
      filtered = filtered.filter((lead) => lead.leadStatus === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.clientPhone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredLeads(filtered);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    filterLeads();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterLeads();
  };

  const resetFilters = () => {
    setStatusFilter("");
    setSearchTerm("");
    setFilteredLeads(initialLeads);
  };

  const getLeadStatusBgColor = (status) => {
    switch (status) {
      case "LOST":
        return "#e74c3c";
      case "COMPLETED":
        return "#2ecc71";
      case "FOLLOW UP":
        return "#f39c12";
      default:
        return "#333";
    }
  };

  const truncateComment = (comment) => {
    const maxLength = 50;
    return comment.length > maxLength ? comment.substring(0, maxLength) + "..." : comment;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const tableStyles = {
    width: "95%",
    margin: "20px auto",
    borderCollapse: "collapse",
    backgroundColor: "#333",
    color: "#f39c12",
  };

  const headerStyles = {
    backgroundColor: "#333",
    textAlign: "left",
    padding: "10px",
    border: "1px solid white",
    color: "#f39c12",
  };

  const rowStyles = {
    textAlign: "left",
    padding: "10px",
    border: "1px solid white",
    color: "#000",
    wordWrap: "break-word",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
<h2 style={{ color: "#f39c12" }}>SIMPLE LEADS MANAGEMENT WEBSITE</h2>

      <div style={{ marginBottom: "20px" }}>
        <div>
          <span style={{ color: "#f39c12", marginRight: "20px" }}>
            Calls Today: {todayCalls}
          </span>
          <span style={{ color: "#f39c12", marginRight: "20px" }}>
            Visits Today: {todayVisits}
          </span>
          <span style={{ color: "#e74c3c", marginRight: "20px" }}>
            Missed Calls: {missedCalls}
          </span>
          <span style={{ color: "#e74c3c", marginRight: "20px" }}>
            Missed Visits: {missedVisits}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Name or Phone"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            marginRight: "20px",
            borderRadius: "4px",
            border: "1px solid white",
            backgroundColor: "#444",
            color: "#f39c12",
          }}
        />

        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid white",
            backgroundColor: "#444",
            color: "#f39c12",
          }}
        >
          <option value="">Filter by Status</option>
          <option value="LOST">LOST</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="FOLLOW UP">FOLLOW UP</option>
        </select>

        <button
          onClick={resetFilters}
          style={{
            padding: "10px",
            marginLeft: "20px",
            backgroundColor: "#f39c12",
            color: "#333",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Reset Filters
        </button>
      </div>

      {loading ? (
        <p style={{ color: "#f39c12" }}>Loading leads...</p>
      ) : (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={headerStyles}>SR NO.</th>
              <th style={headerStyles}>Customer Name</th>
              <th style={headerStyles}>Phone Number</th>
              <th style={headerStyles}>Looking For</th>
              <th style={headerStyles}>Condition</th>
              <th style={headerStyles}>Type</th>
              <th style={headerStyles}>Lead Status</th>
              <th style={headerStyles}>Comments</th>
              <th style={headerStyles}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead, index) => {
                const latestFollowUp = getLatestFollowUp(lead);
                const followUpStatus = latestFollowUp ? getFollowUpStatus(latestFollowUp) : null;
                const isFollowUp = followUpStatus ? followUpStatus === "green" : false;
                const isFollowUpPast = followUpStatus ? followUpStatus === "red" : false;
                const leadStatusColor = isFollowUp ? "blue" : isFollowUpPast ? "red" : "#000";

                return (
                  <tr
                    key={lead.id}
                    style={{ backgroundColor: getLeadStatusBgColor(lead.leadStatus) }}
                  >
                    <td style={{ ...rowStyles, color: leadStatusColor }}>{index + 1}</td>
                    <td style={rowStyles}>
                      <Link
                        to={`/leadinfo/${lead.id}`}
                        style={{
                          color: "#000",
                          textDecoration: "none",
                        }}
                      >
                        {lead.clientName || "N/A"}
                      </Link>
                    </td>
                    <td style={rowStyles}>{lead.clientPhone || "N/A"}</td>
                    <td style={rowStyles}>{lead.lookingFor || "N/A"}</td>
                    <td style={rowStyles}>{lead.condition || "N/A"}</td>
                    <td style={rowStyles}>{lead.type || "N/A"}</td>
                    <td style={rowStyles}>{lead.leadStatus || "N/A"}</td>
                    <td style={rowStyles}>{truncateComment(lead.comments || "N/A")}</td>
                    <td style={rowStyles}>{formatDate(lead.date) || "N/A"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td style={rowStyles} colSpan="9">
                  No leads available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeadsTable;
