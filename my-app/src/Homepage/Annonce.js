import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetchListUser from "../CustomHooks/useFetchListUser";
import useFetchListCategory from "../CustomHooks/useFetchListCategory";
import useFetchListSchools from "../CustomHooks/useFetchListSchools";

const Annonce = ({ annonce }) => {
  const { title, price, created_at, img, category_id, description, seller_id } =
    annonce;

  const { loadinglistuser, listuser } = useFetchListUser();
  const { loadinglistcategory, listcategory } = useFetchListCategory();
  const { loadinglistschools, listschools } = useFetchListSchools();

  const [user, setUser] = useState([]);
  const [category, setCategory] = useState([]);
  const [theschool, setTheSchool] = useState([]);

  useEffect(() => {
    if (loadinglistuser) return;
    let result = listuser.find((user) => {
      return user.id === seller_id;
    });
    setUser(result);
  }, [loadinglistuser, listuser]);

  useEffect(() => {
    if (loadinglistcategory) return;
    let result = listcategory.filter((cat) => {
      return cat.id === category_id;
    });
    setCategory(result[0]);
  }, [loadinglistcategory, listcategory]);

  useEffect(() => {
    if (loadinglistschools || loadinglistuser) return;
    let result3 = listschools.filter((curschool) => {
      return user.school_id === curschool.id;
    });
    setTheSchool(result3[0]);
  }, [loadinglistschools, listschools, loadinglistuser]);

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
              <h4>Catégorie : {category ? category["name"] : "loading..."}</h4>
              <h4>
                Localisation : {theschool ? theschool["name"] : "loading..."}
              </h4>
            </div>

            <ReadMore>{description}</ReadMore>
          </section>
        </section>
      </div>
    </>
  );
};

export default Annonce;
