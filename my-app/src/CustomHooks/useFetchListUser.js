import React from "react";
import { useState, useEffect } from "react";
const url = "http://localhost:5000/list_user";

const useFetchListUser = () => {
  const [loadinglistuser, setLoadingListUser] = useState(true);
  const [listuser, setListUser] = useState();

  const getData = async () => {
    const response = await fetch(url);
    const received = await response.json();
    setListUser(received);
    setLoadingListUser(false);
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { loadinglistuser, listuser };
};

export default useFetchListUser;
