import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";
import { useLocalStorage } from "../../Custom/UseLocalStorage";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useLocalStorage("token", "");

  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });
      const { token } = response.data;
      if (token) {
        alert("User login was successful");
        window.localStorage.setItem("token", token);

        navigate("/home");
      } else {
        alert("invalid user credentials");
      }
    } catch (error) {
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
      setError("Invalid username or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="row justify-content-center ">
      <div className="col-md-4 mt-20">
        <div className="card mt-20">
          <div className="card-body mt-20">
            <h2 className="card-title mb-4">Login</h2>
            <form
              className="p-4 border border-dark rounded "
              onSubmit={handleSubmit}
            >
              <div className=" form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  ref={usernameRef}
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="mb-12 row p-2">
          <Link to="/">Dont have account? Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
