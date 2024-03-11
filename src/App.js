import React, { useEffect, useState } from "react";
import { getAllTeams, getAllMembers } from "./services/api";
import * as XLSX from "xlsx";
import "./App.css"; // Import your CSS file for additional styling

function App() {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [currentTeamPage, setCurrentTeamPage] = useState(1);
  const [currentMemberPage, setCurrentMemberPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this to set the number of items per page
  const [teamSearch, setTeamSearch] = useState("");
  const [memberSearch, setMemberSearch] = useState("");

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

  const indexOfLastTeam = currentTeamPage * itemsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - itemsPerPage;
  const filteredTeams = teams.filter((team) =>
    Object.values(team).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(teamSearch.toLowerCase())
    )
  );
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const indexOfLastMember = currentMemberPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const filteredMembers = members.filter((member) =>
    Object.values(member).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(memberSearch.toLowerCase())
    )
  );
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const paginateTeams = (pageNumber) => setCurrentTeamPage(pageNumber);
  const paginateMembers = (pageNumber) => setCurrentMemberPage(pageNumber);

  return (
    <div className="App">
      <h1>Team and Member Data</h1>
      <button onClick={handleDownloadExcel} className="download-btn">
        Download Excel File
      </button>{" "}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search teams"
          value={teamSearch}
          onChange={(e) => setTeamSearch(e.target.value)}
        />
      </div>
      <h2>Teams:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>College</th>
            <th>Leader Email</th>
            <th>Number of Members</th>
          </tr>
        </thead>
        <tbody>
          {currentTeams.map((team) => (
            <tr key={team.id}>
              <td>{team.teamName}</td>
              <td>{team.college}</td>
              <td>{team.leaderEmail}</td>
              <td>{team.members.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <ul>
          {Array.from({
            length: Math.ceil(filteredTeams.length / itemsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={index + 1 === currentTeamPage ? "active" : ""}
              onClick={() => paginateTeams(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search members"
          value={memberSearch}
          onChange={(e) => setMemberSearch(e.target.value)}
        />
      </div>
      <h2>Members:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Member Name</th>
            <th>Member Email</th>
            <th>Member Phone</th>
            <th>Member Roll</th>
            <th>Team Name</th>
            <th>Team College</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.memberName}</td>
              <td>{member.memberEmail}</td>
              <td>{member.memberPhone}</td>
              <td>{member.memberRoll}</td>
              <td>
                {teams.map((team) => {
                  if (team.id === member.teamID) {
                    return team.teamName;
                  }
                  return null;
                })}
              </td>
              <td>
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
      <div className="pagination">
        <ul>
          {Array.from({
            length: Math.ceil(filteredMembers.length / itemsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={index + 1 === currentMemberPage ? "active" : ""}
              onClick={() => paginateMembers(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
