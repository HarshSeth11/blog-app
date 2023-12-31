import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    title: "",
    catogery: "",
    body: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/createPost", {
      method : "POST",
      headers : {
        "content-type" : "application/json",
      },
      credentials : "include",
      body : JSON.stringify(credentials),
    });

    const results = await response.json();

    console.log(results);

    if(results.success) {
      alert("Post is created");
      navigate("/");
    }
  }

  const handleChange = (e) => {
    setCredentials({...credentials,
      [e.target.id] : e.target.value,
    });
  }


  return (
    <div style={{height : "100vh", width : "100vw", backgroundColor : "#DCBFFF"}}>
        <div>
            < Navbar />
        </div>
        <h1 style={{color : "black" ,textAlign : "center", margin : "1rem", fontWeight : "bold"}}>Create a Post</h1>
        <div style={{display : "flex", justifyContent: "center", alignItems : "center", flexFlow : "column"}}>
          <form onSubmit={handleSubmit}>
            <div>
                <label style={{marginLeft : "10px", fontWeight : "bold"}} htmlFor="title">Title : </label>
                <input value={credentials.title} onChange={handleChange} placeholder="So what's it about..." style={{marginTop : "0", padding: "10px", outline: "none", backgroundColor: "transparent", borderBottom: "1px solid black", color : "black"}} type="text" name="title" id="title"  />
                <label style={{marginLeft : "10px", fontWeight : "bold"}} htmlFor="Category">Category : </label>
                <input value={credentials.category} onChange={handleChange} type="text" style={{marginTop : "0", padding: "10px", outline: "none", backgroundColor: "transparent", borderBottom: "1px solid black", color : "black"}} placeholder="Define one catogery" name="catogery" id="catogery" />
            </div>
            <textarea value={credentials.body} onChange={handleChange} placeholder='Write here...' style={{backgroundColor: "transparent", marginTop : "5px", padding: "10px", outline: "none", border : "1px solid black"}} name="body" id="body" cols="120" rows="15"></textarea>
            <br />
            <button type='submit' style={{marginTop : "2%", backgroundColor: "#D0A2F7", border: "1px solid #D0A2F7", padding : "5px 10px"}}>Submit</button>
          </form>
        </div>
    </div>
  )
}
