import React from "react";
import Annonce from "./Annonce";
import { useState, useEffect } from "react";
import data from "../api/annonces";
import { Link } from "react-router-dom";

const Annonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const getAnnonces = () => {
    const result = data.map((annonce, index) => {
      return (
        <>
          <Link to={`Product/Product/${annonce.id}`} className="text-link">
            <Annonce annonce={annonce} />
          </Link>
        </>
      );
    });
    setAnnonces(result);
  };

  useEffect(() => {
    getAnnonces();
  }, []);

  return (
    <>
      <section className="annoncesection">
        <div className="annonce-container">
          <div className="listeannonces">{annonces}</div>
        </div>
      </section>
    </>
  );
};

export default Annonces;