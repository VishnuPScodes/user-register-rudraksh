import { useState, useEffect } from "react";
import axios from "axios";
import DotsLoader from "./DotsLoader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://user-register-rudraksh.onrender.com/api/users/memunda"
      );
      setUsers(response.data.users);
      setCount(response.data.count);
      setError("");
    } catch (error) {
      setError("Error fetching users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="users-container">
        <DotsLoader color="#646cff" size={30} />
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const exportDataToCSV = () => {
    const csvData = [
      ["Name", "Mobile"],
      ...users.map((user) => [user.name, user.mobile]),
    ].join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="btn-container">
          <div className="total-count">Total Count: {count}</div>
          <div onClick={exportDataToCSV} className="total-count">
            Export data
          </div>
        </div>
      </div>
      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-name">{user.name}</div>
            <div className="user-mobile">{user.mobile}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
