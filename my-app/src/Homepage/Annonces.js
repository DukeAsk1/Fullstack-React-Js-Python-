import React from "react";
import Annonce from "./Annonce";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchPosts from "../CustomHooks/useFetchPosts";

const Annonces = () => {
  const { loadinglistposts, listposts } = useFetchPosts();
  const [posts, setPosts] = useState();

  useEffect(() => {
    if (loadinglistposts) return;
    setPosts(listposts);
  }, [loadinglistposts, listposts]);

  useEffect(() => {
    getAnnonces();
  }, [posts]);

  const [annonces, setAnnonces] = useState([]);
  const getAnnonces = () => {
    if (!posts) return;
    const result = posts.map((annonce, index) => {
      return (
        <>
          <Annonce annonce={annonce} />
        </>
      );
    });
    setAnnonces(result);
  };

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
