import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import DotsLoader from "./component/DotsLoader";
import MemundaRegistrations from "./pages/MemundaRegistrations";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 2500);
    return () => clearTimeout(timer);
  }, [message]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        "https://user-register-rudraksh.onrender.com/api/register",
        formData
      );
      setLoader(false);
      setMessage("Registration successful!");
      setFormData({ name: "", mobile: "" });
    } catch (error) {
      setLoader(false);
      setMessage("Error registering user: " + error.message);
    }
  };

  return (
    <Router>
      <div>
        <nav className="nav-container">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/memunda-registrations" className="nav-link">View Registrations</Link>
        </nav>

        <Routes>
          <Route path="/memunda-registrations" element={<MemundaRegistrations />} />
          <Route path="/" element={
            <div className="app-container">
              <h1>Diksha Registration</h1>
              {message && (
                <p className={message.includes("Error") ? "error" : "success"}>
                  {message}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number:</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    minLength={10}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    required
                  />
                </div>
                <button type="submit">{loader ? <DotsLoader /> : "Register"} </button>
              </form>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
