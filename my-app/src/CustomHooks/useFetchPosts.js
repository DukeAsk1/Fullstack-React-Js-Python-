import React from "react";
import { useState, useEffect } from "react";
const url = "http://localhost:5000/posts";

const useFetchPosts = () => {
  const [loadinglistposts, setLoadingPosts] = useState(true);
  const [listposts, setListPosts] = useState();

  const getData = async () => {
    const response = await fetch(url);
    const received = await response.json();
    setListPosts(received);
    setLoadingPosts(false);
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { loadinglistposts, listposts };
};

export default useFetchPosts;
