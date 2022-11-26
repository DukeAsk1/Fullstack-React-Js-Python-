import React from "react";
import { useState, useEffect } from "react";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:5000/posts";

  const getPosts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return { loading, posts };
};

export default useFetchPosts;
