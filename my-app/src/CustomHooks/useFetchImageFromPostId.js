import React from "react";
import { useState, useEffect } from "react";
const url = "http://localhost:5000/get_Image";

const useFetchImageFromPostId = (post_id) => {
  let url = new URL("http://localhost:5000/get_Image");
  url.search = new URLSearchParams({
    post_id: post_id,
  });
  const [loadingimage, setLoadingImage] = useState(true);
  const [image, setImage] = useState();

  const getData = async () => {
    const response = await fetch(url);
    const received = await response.json();
    setImage(received);
    setLoadingImage(false);
  };

  useEffect(() => {
    getData();
  }, [post_id]);

  return { loadingimage, image };
};

export default useFetchImageFromPostId;
