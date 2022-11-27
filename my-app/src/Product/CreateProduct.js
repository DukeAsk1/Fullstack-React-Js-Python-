import React from "react";
import Homepage from "../Homepage/Homepage";
import Main from "../Homepage/Main";

const CreateProduct = () => {
  const handleSubmit = (e) => {
    console.log("HELLO");

    e.preventDefault();
  };

  return (
    <>
      <div className="createproduct-maincontainer">
        <Main />
        <div className="createproductform-container">
          <div className="createproductform-square">
            <div className="top">
              <h2>Créer une annonce</h2>
            </div>
            <div className="middle">
              <form className="lorem-form" onSubmit={handleSubmit}>
                <input type="titre" placeholder="Titre" />
                <input type="category" placeholder="Catégorie" />
                <input type="description" placeholder="Description" />
                <input type="prix" placeholder="Prix" />
                <button type="submit">Soumettre</button>
              </form>
            </div>
            <div className="bottom"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;

// {
//     "id": "string",
//     "title": "string",
//     "category_id": "string",
//     "jpeg": "string",
//     "description": "string",
//     "seller_id": "string",
//     "price": 0,
//     "created_at": "2022-11-27T01:05:23.737Z"
//   }
