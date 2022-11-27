import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainFilterContext } from "../App";
import lebonplanimg from "../lebonplan.png";
import data from "../api/annonces";
import lelogo from "../Universitetudiant.png";

import useFetchListCategory from "../CustomHooks/useFetchListCategory";
import App from "../App";

const Main = () => {
  const { loadinglistcategory, listcategory } = useFetchListCategory();
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState();

  let myAccountId = "efayonga";

  const getNumberOfCategories = () => {
    return listcategory.map((cat, index) => {
      return (
        <h5 key={index} className="category">
          {cat.name}
        </h5>
      );
    });
  };

  useEffect(() => {
    if (loadinglistcategory) return;
    setCategories(getNumberOfCategories());
  }, [loadinglistcategory, listcategory]);

  return (
    <>
      <div className="Main-Container">
        <div className="main-nav">
          <Link className="text-link" to="/">
            <img src={lelogo} className="lelogomain" />
          </Link>
          <button className="btn">
            <Link to={`/createproduct`} className="text-link">
              <h4>Déposer une annonce</h4>
            </Link>
          </button>
          <div className="connectmyprofile">
            <button className="btn">
              <Link to={`/user/${myAccountId}`} className="text-link">
                <h4>Mon Profil</h4>
              </Link>
            </button>
            <button className="btn">
              <Link to={`/connect`} className="text-link">
                <h4>Se Connecter</h4>
              </Link>
            </button>
          </div>
        </div>
        <div className="category-nav">{categories}</div>
      </div>
    </>
  );
};

export default Main;
