import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../display/Navbar";
import "../componentsStyle/Account.css";


export default function Signup() {
  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const data = {name,userName,email,password};

  const createUser = async () =>{
    console.log(data);
    try {
      const response = await fetch("http://localhost:5000/users/create", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
  
      const results = await response.json();
      console.log(results);
      
      if(results.success) {
        alert("You're Successfully sign up");
        navigate("/login")
      }

      else if(!results.success && results.obj) {
        for (let key in results.obj) {
          alert(`${key} already exists`);
        }
      }
      else if(!results.success) {
        alert(results.error);
        console.log(results.error);
      }
      
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  const postData = (e) => {
    e.preventDefault();
    if(name.length <= 0 || userName.length <= 0 || email.length <= 0 || password <= 0) alert("Enter all the fields");
    else if(password.length < 8) alert("Password should be of 8 characters");
    else{
      createUser();
    }
  }

  return (
    <div className="page">
      <div className="box">
        <div className="signup-form">
          <div class="col-lg-12 login-title">SIGN UP</div>
          <form onSubmit={postData}>
            <div className="from-group">
              <input placeholder="Name" value={name} type="text" className="name" id="name" onChange={(e) => setName(e.currentTarget.value) } required/>
            </div>
            <div className="from-group">
              <input placeholder="Username" type="text" id="username" value={userName} onChange={(e) => setUserName(e.currentTarget.value) } required/>
            </div>
            <div className="from-group">
              <input placeholder="Email" type="email" id="email" value={email} onChange={(e) => setEmail(e.currentTarget.value) } required/>
            </div>
            <div className="from-group">
              <input placeholder="Password" type="password" id="password" value={password} onChange={(e) => setPassword(e.currentTarget.value) } required/>
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
