import React from "react";
import "../componentsStyle/Home.css";


export default function LeftSection() {
  return (
    <div className="container mt-5 mx-3">
      <form className="d-flex form" role="search">
        <input
          className="search"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <i class="fa-solid fa-magnifying-glass mt-1 mx-2"></i>
      </form>
    </div>
  );
}
