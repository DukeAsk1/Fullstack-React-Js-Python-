import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchUsers from "../CustomHooks/useFetchUsers";
import useFetchPosts from "../CustomHooks/useFetchPosts";
import useFetchSchools from "../CustomHooks/useFetchSchools";
import Main from "../Homepage/Main";
import data from "../api/annonces";
import Annonce from "../Homepage/Annonce";

const User = () => {
  const { loading, users } = useFetchUsers();
  const { postloading, posts } = useFetchPosts();
  const { schoolloading, schools } = useFetchSchools();

  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [postlist, setPostList] = useState([]);
  const [theschool, setTheSchool] = useState("");

  useEffect(() => {
    if (loading) return;
    let result = users.filter((user) => {
      return user.username === id;
    });

    setUser(result[0]["name"]);
  }, [loading, users]);

  useEffect(() => {
    if (postloading) return;
    let result = posts.filter((post) => {
      return post.seller_id === user.id;
    });

    setPostList(result);
  }, [postloading, posts]);

  useEffect(() => {
    if (schoolloading || loading) return;
    let result = schools.find((curschool) => {
      return user.school_id === curschool.id;
    });

    console.log(result);
    setTheSchool(result);
  }, [schoolloading, schools]);

  const UserPresentation = () => {
    return (
      <>
        <div className="ficheuser">
          <div className="leftside">
            <img src="https://freesvg.org/img/abstract-user-flat-4.png" />
          </div>

          <div className="rightside">
            <div className="left">
              <h3>
                {" "}
                {user.lastname} {user.firstname}
              </h3>
              <h3>
                {" "}
                Email :<br /> {user.email}
              </h3>
            </div>

            <div className="right">
              <h3>
                {" "}
                Ecole :<br /> {theschool.name}
              </h3>
              <h3>
                {" "}
                Habite à :<br /> {user.city}
              </h3>
            </div>
          </div>
        </div>
      </>
    );
  };

  const FicheUtilisateur = () => {
    return (
      <>
        <div className="ficheutilisateur-container">
          <UserPresentation />
        </div>
      </>
    );
  };

  const AnnoncesUtilisateur = () => {
    return (
      <>
        <div className="annoncesutilisateur-container">
          <h2>{postlist.length} annonces</h2>
          <div className="listeannonces">
            {postlist.map((post) => {
              return <Annonce annonce={post} />;
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mainuserpage-container">
        <Main />
        <div className="mainuser-container">
          <FicheUtilisateur />
          <AnnoncesUtilisateur />
        </div>
      </div>
    </>
  );
};

export default User;
