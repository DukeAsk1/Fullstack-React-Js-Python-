import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Main from "../Homepage/Main";
import Annonce from "../Homepage/Annonce";

import useFetchListSchools from "../CustomHooks/useFetchListSchools";
import useFetchListUser from "../CustomHooks/useFetchListUser";
import useFetchPosts from "../CustomHooks/useFetchPosts";

const User = () => {
  const { loadinglistuser, listuser } = useFetchListUser();
  const { loadinglistposts, listposts } = useFetchPosts();
  const { loadinglistschools, listschools } = useFetchListSchools();

  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [postlist, setPostList] = useState([]);
  const [theuserschool, setTheUsersSchool] = useState([]);

  useEffect(() => {
    if (loadinglistuser) return;
    let result = listuser.filter((user) => {
      return user.username === id;
    });
    setUser(result[0]);
  }, [loadinglistuser, listuser]);

  useEffect(() => {
    if (loadinglistposts || loadinglistuser) return;
    let result2 = listposts.filter((post) => {
      return post.seller_id === user.id;
    });
    setPostList(result2);
  }, [loadinglistposts, listposts, loadinglistuser]);

  useEffect(() => {
    if (loadinglistschools || loadinglistuser) return;
    let result3 = listschools.find((curschool) => {
      return user.school_id === curschool.id;
    });
    setTheUsersSchool(result3);
  }, [loadinglistschools, listschools, loadinglistuser]);

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
                {user.lastname} {user.firstname} | {user.username}
              </h3>
              <h3>
                {" "}
                Email :<br /> {user.email}
              </h3>
            </div>

            <div className="right">
              <h3>
                {" "}
                Ecole :<br /> {theuserschool ? theuserschool["name"] : ""}
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
