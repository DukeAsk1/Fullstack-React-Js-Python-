import React from "react";
import { useState, useEffect } from "react";
import Main from "../Homepage/Main";
import data from "../api/annonces";
import Annonce from "../Homepage/Annonce";

const User = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      var url = "http://localhost:5000";
      var page = "/list_user";

      const response = await fetch(url + page);
      const users = await response.json();

      const result = users.map((user, index) => {
        return (
          <>
            <p>
              Pseudo : {user.username} | Prénom : {user.firstname} | email :
              {user.email} | id :{user.id}
            </p>
          </>
        );
      });

      setUsers(result);
    } catch (e) {
      console.log(e);
    }
  };

  const UserPresentation = () => {
    return (
      <>
        <div className="ficheuser">
          <div className="leftside">
            <img src="https://freesvg.org/img/abstract-user-flat-4.png" />
          </div>

          <div className="rightside">
            <div className="left">
              <h3> Pseudo : pseudo</h3>
              <h3> Email : email</h3>
            </div>

            <div className="right">
              <h3> Ecole : Ecole</h3>
              <h3> Habite à : localisation</h3>
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
    const result = data.map((annonce, index) => {
      return (
        <>
          <Annonce annonce={annonce} />
        </>
      );
    });
    return (
      <>
        <div className="annoncesutilisateur-container">
          <h2>X annonces</h2>
          <div className="listeannonces">{result}</div>
        </div>
      </>
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

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
