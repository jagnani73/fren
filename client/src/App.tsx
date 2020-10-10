import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.scss";
import "./tailwind.scss";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Index from "./pages/Index";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Index} />
      </Switch>
    </>
  );
};

export default App;
