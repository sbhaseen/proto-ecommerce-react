import React, { useContext, useEffect, useReducer } from "react";
import { getUserProfile, loginUser, registerUser } from "../API";
import { UserRegisterData, UserStoredData } from "../common-interfaces";

type Action =
  | { type: "start" }
  | { type: "login"; payload: any }
  | { type: "failure" }
  | { type: "logout" }
  | { type: undefined };
type Dispatch = (action: Action) => void;
type State = {
  currentUser: UserStoredData | undefined;
  loading: boolean;
  token: string | undefined;
};
type AuthProviderProps = { children: React.ReactNode };

const AuthContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

async function handleRegisterUser(
  dispatch: Dispatch,
  newUserData: UserRegisterData
) {
  try {
    await registerUser(newUserData);
    await handleLoginUser(dispatch, {
      email: newUserData.email,
      password: newUserData.password,
    });
  } catch (error) {
    dispatch({ type: "failure" });
    throw error;
  }
}

async function handleLoginUser(
  dispatch: Dispatch,
  loginData: { email: string; password: string }
) {
  try {
    const getTokenData = await loginUser(loginData);
    const accessToken = getTokenData.data.access_token;
    await getUser(dispatch, accessToken);
  } catch (error) {
    dispatch({ type: "failure" });
    throw error;
  }
}

async function getUser(dispatch: Dispatch, accessToken: string) {
  try {
    dispatch({ type: "start" });
    const getUserData = await getUserProfile(accessToken);
    const user = getUserData.data;
    dispatch({ type: "login", payload: { accessToken, user } });
  } catch (error) {
    dispatch({ type: "failure" });
    throw error;
  }
}

function authReducer(state: State, action: Action) {
  switch (action.type) {
    case "start": {
      return {
        ...state,
        loading: true,
      };
    }
    case "login": {
      localStorage.setItem("ecomm-token", action.payload.accessToken);
      return {
        currentUser: action.payload.user,
        loading: false,
        token: action.payload.accessToken,
      };
    }
    case "failure":
    case "logout": {
      localStorage.removeItem("ecomm-token");
      return { currentUser: undefined, loading: false, token: undefined };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {
    currentUser: undefined,
    loading: false,
    token: localStorage.getItem("ecomm-token") || undefined,
  });

  const value = { state, dispatch };

  useEffect(() => {
    if (!state.currentUser && state.token) {
      getUser(dispatch, state.token);
    }
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth, handleRegisterUser, handleLoginUser };
