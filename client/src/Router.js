import React from "react";

import { Error, Home, LoginRedirect } from "./pages";
import { PAGES } from "./res";

const routes = {
    "/": () => <Home />,
    [PAGES.ERROR]: () => <Error />,
    [PAGES.HOME]: () => <Home />,
    [PAGES.LOGIN_REDIRECT]: () => <LoginRedirect />,
};

export default routes;
