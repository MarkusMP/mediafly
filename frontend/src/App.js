import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileUserPage from "./pages/ProfileUserPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/profile/edit" component={ProfileEditPage} />
        <Route path="/profile/:id" component={ProfileUserPage} />
        <Route path="/page/:pageNumber" component={HomePage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
