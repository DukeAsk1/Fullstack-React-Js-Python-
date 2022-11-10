import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Annonce = ({ annonce }) => {
  const { title, price, localisation, img, categorie } = annonce;

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 150) : text}
        <button onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : "show less"}
        </button>
      </p>
    );
  };

  const handleClick = () => {
    <Link />;
  };

  return (
    <>
      <div className="annonce" onClick={handleClick}>
        <section className="top">
          <h3>{title}</h3>
        </section>

        <section className="bottom">
          <section className="left">
            <img src={img} />
          </section>

          <section className="right">
            <h3>{price}€</h3>
            <h4>Catégorie : {categorie}</h4>
            <h4>{localisation}</h4>
            <ReadMore>
              dnazeind iauio fzuiea gfuiagze fiudlvlqh bcbiuazb iufezbiufaizu
              bfuibez fiuabezui fjkdb abhfiu ezafjkd klbuqidb kjlcb sqjkdciu
              azejlcb ldkjb quibc kjqsdb b qcbbiue cbaiuzebc ilzaebc zalkjb ta
              capté
            </ReadMore>
          </section>
        </section>
      </div>
    </>
  );
};

export default Annonce;
