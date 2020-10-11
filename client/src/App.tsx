import React, { useEffect, useContext, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";
import "./tailwind.scss";
import { AuthContext } from "./context/authContext";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Index from "./pages/Index";

import Client from "./pages/Client";
import NewNote from "./pages/Client/NewNote";

import Therapist from "./pages/Therapist";
import SingleUser from "./pages/Therapist/User";

const App = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      authContext.setIsAuth(true);
    }
  }, [authContext]);

  let dumbRoutes = (
    <>
      <Redirect from="/therapist" to="/" />
      <Redirect from="/client" to="/" />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/" exact component={Index} />
    </>
  );

  let clientRoutes = (
    <>
      <Switch>
        <Redirect from="/therapist" to="/client" />
        <Redirect from="/login" to="/client" />
        <Redirect from="/signup" to="/client" />
        <Redirect from="/" to="/client" exact />
      </Switch>
      <Route path="/client/new-note" exact component={NewNote} />
      <Route path="/client" component={Client} />
    </>
  );

  let therapistRoutes = (
    <>
      <Switch>
        <Redirect from="/client" to="/therapist" />
        <Redirect from="/login" to="/therapist" />
        <Redirect from="/signup" to="/therapist" />
        <Redirect from="/" to="/therapist" exact />
      </Switch>
      <Route path="/therapist" component={Therapist} />
      <Route path="/therapist/:id" exact component={SingleUser} />
    </>
  );

  return (
    <>
      {/* {authContext.isAuth
        ? localStorage.getItem("category") === "client"
          ? clientRoutes
          : therapistRoutes
        : dumbRoutes} */}
      {therapistRoutes}
    </>
  );
};

export default App;
