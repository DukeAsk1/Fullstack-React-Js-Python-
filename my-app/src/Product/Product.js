import React from "react";
import Main from "../Homepage/Main";
import { useParams } from "react-router-dom";
import img from "../basicuser.png";

const Product = () => {
  const { id } = useParams();

  const PageProduit = () => {
    return (
      <>
        <div className="PageProduit-container">
          <p>Catégorie : category</p>
          <div className="produit-container">
            <img src={img}></img>
            <div className="informations-container">infos</div>
          </div>

          <p>PageProduit</p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mainproduct-container">
        <Main />
        <PageProduit />
      </div>
    </>
  );
};

export default Product;
