import React, { useState } from "react";
import "../componentsStyle/Home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const d = [
  {
    img: "https://source.unsplash.com/random/70×20/?fruit",
    title: "Fresh Fruits",
    text: "Some quick example text to build on the card title and make up thebulk of the card's content. ",
    link: "/",
    category: "fruit",
  },
  {
    img: "https://source.unsplash.com/random/70×20/?newspaper",
    title: "Fresh Fruits",
    text: "Some quick example text to build on the card title and make up thebulk of the card's content. ",
    link: "/",
    category: "newspaper",
  },
  {
    img: "https://source.unsplash.com/random/70×20/?grains",
    title: "Fresh Fruits",
    text: "Some quick example text to build on the card title and make up thebulk of the card's content. ",
    link: "/",
    category: "grains",
  },
  {
    img: "https://source.unsplash.com/random/70×20/?diwali",
    title: "Fresh Fruits",
    text: "Some quick example text to build on the card title and make up thebulk of the card's content. ",
    link: "/",
    category: "diwali",
  },
  {
    img: "https://source.unsplash.com/random/70×20/?festival",
    title: "Fresh Fruits",
    text: "Some quick example text to build on the card title and make up thebulk of the card's content. ",
    link: "/",
    category: "festival",
  },
  {
    img: "https://source.unsplash.com/random/70×20/?modal",
    title: "Fresh Fruits",
    text: "Some quick example text to build on the card title and make up thebulk of the card's content. ",
    link: "/",
    category: "modal",
  },
  {
    img: "https://source.unsplash.com/random/70×20/?cloths",
    title: "Fresh Fruits",
    text: "Some quick example text to build on the card title and make up thebulk of the card's content. ",
    link: "/",
    category: "cloths",
  },
];


export default function Card() {
  const [data, setData] = useState(d);

  return (
    <div className="blogs">
      {data.map((element) => {
        return (
          <Link to="post" state={{element}}>
          <div class="card" style={{ width: "20rem" }}>
                <div className="con">
                    <img src={element.img} class="card-img-top img" alt="..." />
                    <div className="topleft">{element.category}</div>
                </div>
            <div class="card-body">
              <h5>{element.title}</h5>
              <p class="card-text">{element.text}</p>
            </div>
            <a className="readmore" href={element.link}>Read More</a>
          </div>
          </Link>
        );
      })}
    </div>
  );
}
