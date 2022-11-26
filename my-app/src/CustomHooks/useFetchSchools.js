import React from "react";
import { useState, useEffect } from "react";

const useFetchSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:5000/list_school";

  const getSchools = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setSchools(data);
    setLoading(false);
  };

  useEffect(() => {
    getSchools();
  }, []);

  return { loading, schools };
};

export default useFetchSchools;
