import React, { useEffect, useState } from "react";
import Navbar from "../display/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthState";

export default function Login() {
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useAuth();

  const checkLoggedIn = () => {
    console.log(isLoggedIn);
    if(isLoggedIn) navigate("/");
  }

  useEffect(() => {
    checkLoggedIn();
    // eslint-disable-next-line
  },[])

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials.email);
    const response = await fetch("http://localhost:5000/users/login", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        email: credentials.email,
        password : credentials.password,
      }),
      credentials: "include",
    })

    const results = await response.json();
    console.log(results.msg);

    if(results.success) {
      alert("You're Successfully logged in");
      setIsLoggedIn(true);
      navigate("/");
    }
    else if(!results.success) {
      alert(results.msg);
    }
  }

  const handleChange = (e) => {
    setCredentials({...credentials,
      [e.target.name] : e.target.value,
    });
  }

  return (
    <div className="page">
      <div>
        <Navbar />
      </div>
      <div className="box">
        <div className="login-form">
          <div class="col-lg-12 login-title">SIGN UP</div>
          <form onSubmit={handleSubmit}>
            <div className="from-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="email" id="email" name="email" value={credentials.email} onChange={handleChange} />
            </div>
            <div className="from-group">
              <label htmlFor="password">password:</label>
              <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} />
            </div>
            <div className="from-group">
              <button type="submit" className="btn signup-btn col-6">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
