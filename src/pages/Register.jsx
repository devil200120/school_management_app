import "../css/Authform.css";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import routes from "../routes";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Simulate successful registration without backend
    setTimeout(() => {
      // Store user data for the flow
      const userData = {
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        role: "user",
      };
      localStorage.setItem("registrationData", JSON.stringify(userData));
      localStorage.setItem("userEmail", formData.email);

      setLoading(false);
      // Redirect directly to subscription plans
      navigate(routes.subscriptionPlans);
    }, 1000);
  };

  return (
    <div className="Auth-form">
      <form onSubmit={handleSubmit} className="signup-form">
        <center>
          <img src="/EDUOSlogo.png" alt="EDUOS Logo" />
        </center>

        <div className="title">Signup</div>
        {error && <div className="error-message">{error}</div>}

        <div className="input-boxes">
          <div className="flex">
            <div className="input-box">
              <FaUser />
              <input
                type="text"
                name="firstname"
                placeholder="Enter your First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <FaUser />
              <input
                type="text"
                name="lastname"
                placeholder="Enter your Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-box">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex">
            <div className="input-box">
              <FaLock />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <FaLock />
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-button input-box">
            <input
              type="submit"
              value={loading ? "Signing Up..." : "Sign Up"}
              disabled={loading}
            />
          </div>
          <div className="text sign-up-text">
            Already have an account? <Link to={routes.login}>Login now</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
