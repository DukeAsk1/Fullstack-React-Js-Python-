import React from "react";
import Main from "../Homepage/Main";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import img from "../basicuser.png";
import useFetchListUser from "../CustomHooks/useFetchListUser";
import useFetchPosts from "../CustomHooks/useFetchPosts";
import useFetchListSchools from "../CustomHooks/useFetchListSchools";
import useFetchListCategory from "../CustomHooks/useFetchListCategory";

const Product = () => {
  const { id } = useParams();

  const { loadinglistuser, listuser } = useFetchListUser();
  const { loadinglistposts, listposts } = useFetchPosts();
  const { loadinglistschools, listschools } = useFetchListSchools();
  const { loadinglistcategory, listcategory } = useFetchListCategory();

  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [category, setCategory] = useState([]);

  const [theuserschool, setTheUsersSchool] = useState([]);

  useEffect(() => {
    if (loadinglistposts) return;
    let result2 = listposts.find((lepost) => {
      return lepost.id === id;
    });
    setPost(result2);
  }, [loadinglistposts, listposts]);

  useEffect(() => {
    if ((loadinglistuser || loadinglistposts) && post) return;
    let result = listuser.find((user) => {
      return user.id === post.seller_id;
    });
    setUser(result);
  }, [loadinglistuser, listuser, post]);

  useEffect(() => {
    if (loadinglistschools || loadinglistuser) return;
    let result3 = listschools.find((curschool) => {
      return user.school_id === curschool.id;
    });
    setTheUsersSchool(result3);
  }, [loadinglistschools, listschools, user]);

  useEffect(() => {
    if (loadinglistcategory || loadinglistposts) return;
    let result = listcategory.find((cat) => {
      return cat.id === post.category_id;
    });
    setCategory(result);
  }, [loadinglistcategory, listcategory, post]);

  const PageProduit = () => {
    return (
      <>
        <div className="PageProduit-container">
          <div className="produit-container">
            <div className="imagecontainer">
              <img src={img}></img>
            </div>
            <div className="informations-container">
              <h3>{post.title}</h3>
              <h5>Catégorie : {category ? category["name"] : "loading..."}</h5>
              <h5>Prix : {post.price}€</h5>
            </div>
            <p>{post.description}</p>
          </div>
          <div className="postedbyuser">
            <h2>Posté par :</h2>
            <div className="pppseudo">
              <img src={img}></img>
              <h3>{user ? user["username"] : "pseudo"}</h3>
            </div>
            <div className="infos">
              <h4>De l'ecole : {theuserschool ? theuserschool["name"] : ""}</h4>
              <h4>Le : </h4>
            </div>
            <div className="voirleprofil">
              <Link
                to={user ? `/user/${user["username"]}` : ""}
                className="text-link"
              >
                <button>Voir le profil</button>
              </Link>
            </div>
          </div>
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
