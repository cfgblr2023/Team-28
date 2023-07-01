import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log("Login::- ", json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {

      localStorage.setItem("userRole",json.userRole);
      console.log(localStorage.getItem("userRole"));
      
      localStorage.setItem("userId",json.userRole);
      console.log(localStorage.getItem("userId"));

      
      navigate("/home");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="bg-light p-4">
      <div className="container" style={{ maxWidth: "400px" }}>
        <h1 className="text-center mb-4">Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>
          <div className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/createuser" className="text-primary">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
