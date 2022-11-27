import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Connect from "./Connect/Connect";
import User from "./User/User";
import Product from "./Product/Product";
import CreateProduct from "./Product/CreateProduct";

function App() {
  return (
    <>
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
