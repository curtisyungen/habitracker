import React, { useEffect, useReducer } from "react";
import Routes from "./Router";
import { useAuth0 } from "@auth0/auth0-react";
import { useRoutes } from "hookrouter";

import { Navbar } from "./components";
import { Login } from "./pages";
import { AppContainer } from "./styles/theme";

export const MainContext = React.createContext(null);

export const MAIN_ACTIONS = {
    LOGOUT: "logout",
    SET_CURRENT_USER: "set_current_user",
};

const mainReducer = (state, action) => {
    switch (action.type) {
        case MAIN_ACTIONS.LOGOUT:
            return { ...state, logout: true };
        case MAIN_ACTIONS.SET_CURRENT_USER:
            return { ...state, currentUser: action.currentUser };
        default:
            break;
    }
    return state;
};

const initialState = {
    currentUser: null,
    logout: false,
};

const App = () => {
    const [state, dispatch] = useReducer(mainReducer, { ...initialState });
    const { error, isAuthenticated, isLoading } = useAuth0();
    const routeResult = useRoutes(Routes);

    if (error) return <div>Error: {error.message}</div>;
    if (isLoading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Login />
    }

    return (
        <MainContext.Provider value={{ state, dispatch }}>
            <AppContainer>
                <Navbar />
                {routeResult}
            </AppContainer>
        </MainContext.Provider>
    );
};

export default App;
