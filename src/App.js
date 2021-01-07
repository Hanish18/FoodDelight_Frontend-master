import React, { useState } from "react";
import "./App.css";
import Signup from "./components/SignUp/signup";
import Login from "./components/login/login";
import Home from "./components/Home/home";

export default () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState(false);
  const [authToken, setAuthToken] = useState("");

  return (
    <div className="App">
      {!isUserLoggedIn && !isRegister && (
        <Login
          setIsUserLoggedIn={setIsUserLoggedIn}
          setIsRegister={setIsRegister}
          setUsername={setUsername}
          setAuthToken={setAuthToken}
          setUserType={setUserType}
        />
      )}
      {!isUserLoggedIn && isRegister && (
        <Signup setIsRegister={setIsRegister} />
      )}
      {isUserLoggedIn && <Home authToken={authToken} username={username} userType={userType} />}
    </div>
  );
};
