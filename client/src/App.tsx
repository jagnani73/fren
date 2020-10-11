import React, { useEffect, useContext, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";
import "./tailwind.scss";
import { AuthContext } from "./context/authContext";

import Client from "./pages/Client";
import NewNote from "./pages/Client/NewNote";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Index from "./pages/Index";

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
      <Redirect from="/therapist" to="/client" />
      <Redirect from="/login" to="/client" exact />
      <Redirect from="/signup" to="/client" exact />
      <Route path="/client/new-note" exact component={NewNote} />
      <Route path="/client" component={Client} />
    </>
  );

  let therapistRoutes = (
    <>
      <Redirect from="/client" to="/therapist" />
      <Redirect from="/therapist" to="/" />
      <Route path="/therapist" exact>
        <div>therapist routes</div>
      </Route>
      {/* <Route path="/client" component={Client} /> */}
    </>
  );

  return (
    <>
      {authContext.isAuth
        ? localStorage.getItem("category") === "client"
          ? clientRoutes
          : therapistRoutes
        : dumbRoutes}
    </>
  );
};

export default App;
