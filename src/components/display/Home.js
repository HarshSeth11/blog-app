import React from "react";
import '../componentsStyle/Home.css';


// My Components
import Navbar from "./Navbar";
import Card from "./Card";
import Footer from "./Footer";
import LeftSection from "./LeftSection";

export default function Home() {
  return (
    <div className="home">
        <div className="navbar d-inline">
            < Navbar />
        </div>
        <div className="content">
            <section className="filters">
              < LeftSection />
            </section>
            <section className="blogs">
              <div>
                < Card />
              </div>
            </section>
        </div>
        <div className="d-inline">
            < Footer />
        </div>
    </div>
  );
}
