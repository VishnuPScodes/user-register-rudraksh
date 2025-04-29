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

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Memunda Temple Regitrations</h2>
        <div className="total-count">Total Count: {count}</div>
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
