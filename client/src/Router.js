import React from "react";
import { Home, LoginRedirect } from "./pages";

const routes = {
    "/": () => <Home />,
    "/loginRedirect": () => <LoginRedirect />,
};

export default routes;