import React from "react";
import { useState, useEffect } from "react";
const url = "http://localhost:5000/list_category";

const useFetchListCategory = () => {
  const [loadinglistcategory, setLoadingListCategory] = useState(true);
  const [listcategory, setListCategory] = useState();

  const getData = async () => {
    const response = await fetch(url);
    const received = await response.json();
    setListCategory(received);
    setLoadingListCategory(false);
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { loadinglistcategory, listcategory };
};

export default useFetchListCategory;
