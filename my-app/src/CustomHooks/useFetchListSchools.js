import React from "react";
import { useState, useEffect } from "react";
const url = "http://localhost:5000/list_school";

const useFetchListSchools = () => {
  const [loadinglistschools, setLoadingListSchool] = useState(true);
  const [listschools, setListSchools] = useState();

  const getData = async () => {
    const response = await fetch(url);
    const received = await response.json();
    setListSchools(received);
    setLoadingListSchool(false);
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { loadinglistschools, listschools };
};

export default useFetchListSchools;
