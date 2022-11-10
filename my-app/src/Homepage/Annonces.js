import React from "react";
import Annonce from "./Annonce";
import { useState, useEffect } from "react";
import data from "../api/annonces";

const Annonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const getAnnonces = () => {
    const result = data.map((annonce, index) => {
      return <Annonce annonce={annonce} key={index} />;
    });
    setAnnonces(result);
  };

  useEffect(() => {
    getAnnonces();
  }, []);

  return (
    <>
      <section className="annoncesection">
        <div className="listeannonces">{annonces}</div>
      </section>
    </>
  );
};

export default Annonces;
