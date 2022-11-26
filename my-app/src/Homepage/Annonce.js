import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetchUsers from "../CustomHooks/useFetchUsers";

const Annonce = ({ annonce }) => {
  const { title, price, localisation, img, category, description, seller_id } =
    annonce;

  const { loading, users } = useFetchUsers();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (loading) return;
    let result = users.find((user) => {
      return user.id === seller_id;
    });
    setUser(result);
  }, [loading, users]);

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className={`textreadmore${!isReadMore ? "-readmore" : ""}`}>
        {isReadMore ? text.slice(0, 150) : text.slice(0, 600)}
        <br></br>
        {text.length > 150 ? (
          <button onClick={toggleReadMore} className={`read-or-hide`}>
            {isReadMore ? "...read more" : "show less"}
          </button>
        ) : (
          <></>
        )}
      </p>
    );
  };

  const handleClick = () => {
    <Link />;
  };

  return (
    <>
      <div className="annonce" onClick={handleClick}>
        <section className="top"></section>

        <section className="bottom">
          <Link to={`/product/${annonce.id}`} className="text-link">
            <section className="left">
              <img src={img} />
            </section>
          </Link>

          <section className="right">
            <div className="topper">
              <h2>{title}</h2>
              <h3>
                Publié par : {user.lastname} {user.firstname}
              </h3>
            </div>
            <div className="subtopper">
              <h4>Prix : {price}€</h4>
              <h4>Catégorie : {category}</h4>
              <h4>Localisation : {localisation}</h4>
            </div>

            <ReadMore>{description}</ReadMore>
          </section>
        </section>
      </div>
    </>
  );
};

export default Annonce;
