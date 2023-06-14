import React, { useContext, useEffect, useState } from "react";
import axios, { setAxiosToken } from "../axios";

const AuthContext = React.createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [storageData, setStorageData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [erros, setErros] = useState("");

  const resetError = () => {
    setErrorMessage("");
    setErros("");
    setLoading(true);
  };

  const userRegister = async (name, email, password) => {
    const registerData = { name, email, password };
    resetError();
    try {
      const response = await axios.post("/api/register", registerData);
      setCurrentUser(response.data);
      localStorage.setItem("userLoginData", JSON.stringify(response.data));
      setAxiosToken(response.data.token);
    } catch (error) {
      if (error.response.status === 422) {
        setErros(error.response.data.errors);
      }
    }
    setLoading(false);
  };

  const userLogin = async (email, password) => {
    const loginData = { email, password };
    resetError();
    try {
      const response = await axios.post("api/login", loginData);
      if (response.data.status === 200) {
        setCurrentUser(response.data);
        localStorage.setItem("userLoginData", JSON.stringify(response.data));
        setAxiosToken(response.data.token);
      } else {
        setErrorMessage(response.data.errors);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        setErros(error.response.data.errors);
      }
    }
    setLoading(false);
  };

  const userLogout = async () => {
    resetError();
    try {
      const response = await axios.post("api/logout");
      if (response.data.status === 200) {
        setCurrentUser("");
        localStorage.removeItem("userLoginData");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setStorageData(
      currentUser || JSON.parse(localStorage.getItem("userLoginData"))
    );
  }, [currentUser]);

  const userData = {
    currentUser,
    storageData,
    userLogin,
    userRegister,
    userLogout,
    erros,
    errorMessage,
    loading,
  };

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
