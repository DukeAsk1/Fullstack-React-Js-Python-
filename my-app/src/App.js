import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Connect from "./Connect/Connect";
import User from "./User/User";
import Product from "./Product/Product";
import CreateProduct from "./Product/CreateProduct";

export const MainFilterContext = React.createContext("none");

function App() {
  const [mainFilters, setMainFilters] = useState();
  const updateSetMainFilters = (category) => {
    setMainFilters(...mainFilters, category);
  };

  return (
    <>
      <MainFilterContext.Provider
        value={{ mainFilters, updateSetMainFilters }}
      />
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route path="/connect">
            <Connect />
          </Route>

          <Route path="/createproduct">
            <CreateProduct />
          </Route>

          <Route path="/user/:id" children={<User />} />
          <Route path="/product/:id" children={<Product />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
