import React from "react";
import { useState, useEffect } from "react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [test, setTest] = useState("hello");

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

      // let result = users.forEach((obj) => {
      //   Object.entries(obj).forEach(([key, value]) => {
      //     console.log(`${key} ${value}`);
      //     setUsers(...users, { key: { key } }, { value: { value } });
      //   });
      //   console.log("-------------------");
      // });

      setUsers(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        Wsh ça marche j'ai réussi à fetch des données !!{users} {test}
      </div>
      <h1>EAZ8ITDIUAGZEIU</h1>
    </>
  );
};

export default User;
