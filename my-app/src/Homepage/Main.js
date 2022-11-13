import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import lebonplanimg from "../lebonplan.png";
import data from "../api/annonces";

const Main = () => {
  const [categories, setCategories] = useState();

  const getNumberOfCategories = () => {
    const cats = [...new Set(data.map((annonce) => annonce.categorie))];
    return cats.map((cat, index) => {
      return (
        <h4 key={index} className="category">
          {cat}
        </h4>
      );
    });
  };

  useEffect(() => {
    setCategories(getNumberOfCategories());
  }, []);

  return (
    <>
      <div className="Main-Container">
        <div className="main-nav">
          <h2>LE LOGO</h2>
          <button className="btn">
            <h4>Déposer une annonce</h4>
          </button>
          <button className="btn">
            <Link to="../User/User" className="text-link">
              <h4>Mon Profil</h4>
            </Link>
          </button>
        </div>
        <div className="category-nav">{categories}</div>
      </div>
    </>
  );
};

export default Main;
