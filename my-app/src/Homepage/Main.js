import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import lebonplanimg from "../lebonplan.png";
import data from "../api/annonces";

import useFetchListCategory from "../CustomHooks/useFetchListCategory";
const Main = () => {
  const { loadinglistcategory, listcategory } = useFetchListCategory();

  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState();

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
            <h2>LE LOGO</h2>
          </Link>
          <button className="btn">
            <Link to={`/createproduct`} className="text-link">
              <h4>Déposer une annonce</h4>
            </Link>
          </button>
          <div className="connectmyprofile">
            <button className="btn">
              <Link to={`/user/${"efayonga"}`} className="text-link">
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
