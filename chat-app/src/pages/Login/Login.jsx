import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (currentState === "Sign up" && !formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (currentState === "Sign up" && !formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission here
      console.log("Form submitted:", formData);
    }
  };

  const toggleForm = () => {
    setCurrentState(prev => prev === "Sign up" ? "Login" : "Sign up");
    setFormData({
      username: "",
      email: "",
      password: "",
      agreeToTerms: false
    });
    setErrors({});
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src={assets.logo_big} alt="chat icon" className="logo" />
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{currentState}</h2>

          {currentState === "Sign up" && (
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={`form-input ${errors.username ? 'error' : ''}`}
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {currentState === "Sign up" && (
            <div className="form-group">
              <div className="login-term">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className={errors.agreeToTerms ? 'error' : ''}
                />
                <p>Agree to the terms of use & privacy policy.</p>
              </div>
              {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
            </div>
          )}

          <button type="submit" className="submit-btn">
            {currentState === "Sign up" ? "Create account" : "Login now"}
          </button>

          <div className="login-forgot">
            <p className="login-toggle">
              {currentState === "Sign up" ? (
                <>Already have an account? <span onClick={toggleForm}>Login here</span></>
              ) : (
                <>Don't have an account? <span onClick={toggleForm}>Sign up here</span></>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
