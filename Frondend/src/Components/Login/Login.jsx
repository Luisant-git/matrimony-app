import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Header from "../../Pages/Header";
import { encryptToken } from "../../utils/auth";

function Login() {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNo,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Login successful!");
        const encryptedjwt = encryptToken(data.access_token);
        localStorage.setItem("token", encryptedjwt);
        const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";
        navigate(redirectPath);
        window.location.reload()
      } else if (response.status === 400) {
        toast.error("Bad Request: Please check your input.");
      } else if (response.status === 401) {
        toast.error("Unauthorized: Invalid mobile number or password.");
      } else if (response.status === 403) {
        toast.error("Forbidden: You don't have permission to log in.");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Login failed."}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container-fluid mt-5 d-flex align-items-center justify-content-center">
        <div
          className="row shadow-sm border rounded overflow-hidden"
          style={{ width: "80%", maxWidth: "900px" }}
        >
          <div className="col-md-6 p-5">
            <div className="text-start">
              <h2 className="fw-bold mb-3">Login</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="mobileNo" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter mobile number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Enter your Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Type your password here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="input-group-text"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    👁️
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe" className="ms-2">
                    Remember me?
                  </label>
                </div>
                <a href="#" className="text-muted">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2">
                Login
              </button>
            </form>
          </div>
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src="https://wallpaperaccess.com/full/1623466.jpg"
              alt="login visual"
              className="img-fluid"
              style={{ objectFit: "cover", height: "100%" }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
