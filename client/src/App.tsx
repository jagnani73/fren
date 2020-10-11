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

  // let dumbRoutes = (
  //   <>
  //     {/* <Redirect from="/therapist" to="/" /> */}
  //     <Redirect from="/client" to="/" />
  //     <Route path="/login" exact component={Login} />
  //     <Route path="/signup" exact component={Signup} />
  //     <Route path="/" exact component={Index} />
  //   </>
  // );

  // let clientRoutes = (
  //   <>
  //     {/* <Redirect from="/therapist" to="/client" /> */}
  //     <Redirect from="/login" to="/client" exact />
  //     <Redirect from="/signup" to="/client" exact />
  //     <Redirect from="/" to="/client" exact />
  //     <Route path="/client/new-note" exact component={NewNote} />
  //     <Route path="/client" component={Client} />
  //   </>
  // );

  // let therapistRoutes = (
  //   <>
  //     <Redirect from="/login" to="/therapist" exact />
  //     <Redirect from="/signup" to="/therapist" exact />
  //     <Redirect from="/" to="/therapist" exact />
  //     <Route path="/therapist" exact component={Therapist} />
  //     {/* <Route path="/client" component={Client} /> */}
  //   </>
  // );

  return (
    <>
      <Route path="/therapist" component={Therapist} />
      <Route path="/therapist/:id" exact component={SingleUser} />
      <Switch>
        <Route path="/client/new-note" exact component={NewNote} />
        <Route path="/client" component={Client} />
      </Switch>
      {/* {authContext.isAuth
        ? localStorage.getItem("category") === "client"
          ? clientRoutes
          : therapistRoutes
        : dumbRoutes} */}
    </>
  );
};

export default App;
