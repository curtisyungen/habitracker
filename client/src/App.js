import React, { useEffect, useReducer } from "react";
import Routes from "./Router";
import { useAuth0 } from "@auth0/auth0-react";
import { useRoutes } from "hookrouter";

import { User } from "./classes";
import { Loading, Navbar } from "./components";
import { Error, Login } from "./pages";
import { AppContainer } from "./styles/theme";
import { userAPI } from "./utils";

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
    const { error, isAuthenticated, isLoading, user } = useAuth0();
    const routeResult = useRoutes(Routes);

    useEffect(() => {
        if (isAuthenticated) {
            userAPI.findOrCreateUser(user).then((res) => {
                if (!res.data) {
                    return;
                }
                dispatch({
                    type: MAIN_ACTIONS.SET_CURRENT_USER,
                    currentUser: new User(
                        res.data.theme,
                        res.data.userId,
                        res.data.userName
                    ),
                });
            });
        }
    }, [isAuthenticated]);

    if (error) return <Error message={error.message} />;
    if (isLoading) return <Loading />;

    if (!isAuthenticated) {
        return <Login />;
    }

    if (!state.currentUser) {
        return <Loading />;
    }

    return (
        <MainContext.Provider value={{ state, dispatch }}>
            <AppContainer theme={state.currentUser.getTheme()}>
                <Navbar />
                {routeResult}
            </AppContainer>
        </MainContext.Provider>
    );
};

export default App;
