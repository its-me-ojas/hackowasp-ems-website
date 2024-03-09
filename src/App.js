// App.js
import React, { useEffect, useState } from "react";
import { getAllTeams, getAllMembers } from "./services/api";

function App() {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch all teams and set state
    getAllTeams()
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });

    // Fetch all members and set state
    getAllMembers()
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }, []);

  return (
    <div className="App ">
      <h1>Team and Member Data</h1>
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
                {/* // TODO: Add team name here */}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {/* // TODO Add team college here */}
                {}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
