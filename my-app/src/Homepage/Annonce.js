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
      <p className={`textreadmore${!isReadMore ? "-readmore" : ""}`}>
        {isReadMore ? text.slice(0, 150) : text.slice(0, 600)}
        <br></br>
        <button onClick={toggleReadMore} className={`read-or-hide`}>
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
        <section className="top"></section>

        <section className="bottom">
          <section className="left">
            <img src={img} />
          </section>

          <section className="right">
            <div className="topper">
              <h3>{title}</h3>
            </div>
            <div className="subtopper">
              <h4>Prix : {price}€</h4>
              <h4>Catégorie : {categorie}</h4>
              <h4>Localisation : {localisation}</h4>
            </div>

            <ReadMore>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum nisi cupiditate, harum, laborum nam soluta reiciendis
              iste, itaque inventore omnis amet consectetur tempora quis saepe.
              Dicta, mollitia illum! Distinctio necessitatibus ratione tenetur
              voluptatem provident non obcaecati sequi aliquam? Perferendis quam
              tempora aspernatur qui a molestiae ea blanditiis ex! Officia
              officiis illum neque exercitationem quisquam eligendi vitae
              cupiditate! Corporis placeat eos quos molestias ex dolorum at,
              omnis et officiis libero nihil ratione nam ipsam accusamus id
              eaque quod blanditiis. Dicta laudantium suscipit omnis soluta
              nulla placeat laborum animi facere enim consequuntur minima
              pariatur, consectetur quos, vitae recusandae dolores fugiat
              repellendus vel. Quisquam quod iure neque consequuntur, incidunt
              labore fugiat velit dolores necessitatibus distinctio dolorum?
              Placeat non ducimus ratione officia, molestiae sit distinctio
              numquam tenetur necessitatibus ipsam optio, fugit natus minima.
              Cumque sequi aspernatur eaque. Facere, quam expedita, nam autem
              nobis reiciendis accusamus dignissimos adipisci explicabo dolorum
              exercitationem nostrum soluta fugiat non totam. Nisi omnis laborum
              dolore quod nihil obcaecati ab ut, iusto amet illum, fuga tenetur
              dolores aspernatur dignissimos fugiat maxime iure aliquid aperiam
              error blanditiis consectetur. Voluptatem optio aperiam iste neque.
              Similique explicabo, officiis placeat nobis atque ipsum deserunt
              assumenda consequatur? Dolorum modi illo, repellat incidunt fugit
              consequuntur perspiciatis harum!
            </ReadMore>
          </section>
        </section>
      </div>
    </>
  );
};

export default Annonce;
