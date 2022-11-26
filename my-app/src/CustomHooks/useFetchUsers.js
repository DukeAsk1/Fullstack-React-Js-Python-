import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:5000/list_user";

  const getUsers = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { loading, users };
};

export default useFetchUsers;
