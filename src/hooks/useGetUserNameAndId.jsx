import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const useGetUserNameAndId = () => {
  const { setName, setId } = useContext(AuthContext);

  const getUser = async () => {
    const response = await fetch("http://127.0.0.1:8000/users/");
    const data = await response.json();
    console.log(data);
    const { id, username } = data;
    setName(username);
    setId(id);
  };

  return getUser;
};

export default useGetUserNameAndId;
