import { useState, createContext, useEffect } from "react";
import { logOutRequest, loginRequest } from "./authentication.service";
import { clearUser, getInitialUser, saveUser } from "../utils/db";

export const AuthenticationContext = createContext({} as IAuthParams);

export const AuthenticationContextProvider: React.FC<InputAuthParams> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [authError, setAuthError] = useState<string | undefined>();

  useEffect(() => {
    setIsAuthenticated(!!user);
    // console.log(`user has been updated... auth: ${isAuthenticated}`);
    return () => {};
  }, [user]);

  // get initial user
  useEffect(() => {
    setIsLoading(true);
    setAuthError(undefined);
    getInitialUser()
      .then((user) => {
        if (user) {
          setUser(user);
        }
        setIsAuthenticated(!!user);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setAuthError(e.toString());
      });
  }, []);

  const onLogin = (apiKey: string) => {
    setAuthError(undefined);
    if (apiKey.trim() === "") {
      setAuthError("API KEY must not be empty");
      return;
    }
    if (apiKey.length <= 50) {
      setAuthError("API KEY must be >= 50 characters");
      return;
    }
    console.log("logging in ...");
    setIsLoading(true);
    loginRequest(apiKey)
      .then((u) => {
        const authUser: IUser = { apiKey };
        setUser(authUser);
        return authUser;
      })
      .then((u) => {
        saveUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setAuthError(e.toString());
      });
  };

  const onLogout = () => {
    if (!user) {
      return;
    }
    const currentUser = { ...user };
    console.log("Logging out...");
    setIsLoading(true);
    logOutRequest()
      .then(() => {
        clearUser(currentUser);
        setUser(undefined);
        setAuthError(undefined);
        setIsLoading(false);
      })
      .catch((e) => {
        setAuthError(e.toString());
        setIsLoading(false);
      });
  };
  const isLocal = Boolean(
    window?.location?.href?.startsWith("http://localhost:5173")
  );
  // console.log({ isLocal, href: window.location.href });

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        isLocal: Boolean(isLocal),
        authError,
        setAuthError,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export interface IUser {
  apiKey: string;
}

interface InputAuthParams {
  children: any[] | any;
}

export interface IAuthParams {
  isAuthenticated: boolean;
  user: IUser | undefined;
  isLoading: boolean;
  isLocal: boolean;
  authError: any | undefined;
  setAuthError: CallableFunction;
  onLogin: CallableFunction;
  onLogout: CallableFunction;
}
