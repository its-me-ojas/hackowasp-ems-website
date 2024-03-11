import React, { useEffect, useState } from "react";
import { getAllTeams, getAllMembers } from "./services/api";
import * as XLSX from "xlsx";

function App() {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch all teams and set state
    getAllTeams()
      .then((response) => {
        setTeams(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });

    // Fetch all members and set state
    getAllMembers()
      .then((response) => {
        setMembers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }, []);

  const handleDownloadExcel = () => {
    const wsTeams = XLSX.utils.json_to_sheet(teams);
    const wsMembers = XLSX.utils.json_to_sheet(members);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsTeams, "Teams");
    XLSX.utils.book_append_sheet(wb, wsMembers, "Members");
    XLSX.writeFile(wb, "team_and_member_data.xlsx");
  };

  return (
    <div className="App ">
      <h1>Team and Member Data</h1>
      <button
        onClick={handleDownloadExcel}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Download Excel File
      </button>{" "}
      <h2>Teams:</h2>
      <table style={{ marginBottom: "20px" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "center" }}>Team Name</th>
            <th style={{ padding: "10px", textAlign: "center" }}>College</th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Leader Email
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Number of Members
            </th>
          </tr>
        </thead>
        <tbody style={{ borderTop: "2px solid #ccc" }}>
          {teams.map((team) => (
            <tr key={team.id} style={{ background: "color" }}>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {team.teamName}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {team.college}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {team.leaderEmail}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {team.members.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Members:</h2>
      <table style={{ marginBottom: "20px" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Member Name
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Member Email
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Member Phone
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Member Roll
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>Team Name</th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Team College
            </th>
          </tr>
        </thead>
        <tbody style={{ borderTop: "2px solid #ccc" }}>
          {members.map((member) => (
            <tr key={member.id} style={{ background: "color" }}>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {member.memberName}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {member.memberEmail}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {member.memberPhone}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {member.memberRoll}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {teams.map((team) => {
                  if (team.id === member.teamID) {
                    return team.teamName;
                  }
                  return null;
                })}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {/* // TODO Add team college here */}
                {teams.map((team) => {
                  if (team.id === member.teamID) {
                    return team.college;
                  }
                  return null;
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
