import React from "react";

import { Error, Home, Login, LoginRedirect } from "./pages";
import { PAGES } from "./res";

const routes = {
    "/": () => <Home />,
    [PAGES.ERROR]: () => <Error />,
    [PAGES.HOME]: () => <Home />,
    [PAGES.LOGIN]: () => <Login />,
    [PAGES.LOGIN_REDIRECT]: () => <LoginRedirect />,
};

export default routes;
