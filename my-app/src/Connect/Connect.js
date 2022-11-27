import React from "react";
import Main from "../Homepage/Main";

const Connect = () => {
  const BottomActions = () => {
    return (
      <>
        <div className="button-action">
          <button>Register</button>
          <button>Sign in</button>
        </div>
      </>
    );
  };
  const EmailPassword = () => {
    return (
      <>
        <div className="inputfields-container">
          <div className="inputfield">
            <input type="email" placeholder="Email" />
          </div>
          <div className="inputfield">
            <input type="password" placeholder="Password" />
          </div>
        </div>
      </>
    );
  };

  const LoginPage = () => {
    return (
      <>
        <div className="SignContainer">
          <div className="top">
            <h3>Login</h3>
          </div>
          <div className="middle">
            <EmailPassword />
          </div>
          <div className="bottom">
            <BottomActions />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mainloginregistercontainer">
        <Main />
        <div className="loginregister-container">
          <div className="square">
            <div className="loginregister-left">
              <div className="top">
                <p>Bonjour !</p>
              </div>
              <div className="middle">
                <p>
                  lenomdusite est un site innovant mettant en valeur la
                  confiance et le partage entre étudiants.
                  <br />
                  <br /> Que ce soie de la même école, même campus, même ville
                  ou dans toute la France, vous y trouverez votre compte.
                  <br />
                  <br /> Connectez vous ou enregistrez vous pour rejoindre
                  l'aventure !!!
                </p>
              </div>
              <div className="bottom">
                <p>lenomdusite.com &copy;</p>
              </div>
            </div>

            <div className="loginregister-right">
              <LoginPage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connect;
