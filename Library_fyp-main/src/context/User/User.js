import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../Auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ErrorHandler } from "../../Component/ErrorHandler/ErrorHandler";

const UserContext = React.createContext({});

export const UserProvider = (props) => {
  const { token } = useContext(AuthContext);
  const user = "";
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
export const UserConsumer = UserContext.Consumer;
export default UserContext;
