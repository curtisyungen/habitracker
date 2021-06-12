import React from "react";
import { AddHabit, Home, LoginRedirect } from "./pages";

const routes = {
    "/": () => <Home />,
    "/addHabit": () => <AddHabit />,
    "/loginRedirect": () => <LoginRedirect />,
};

export default routes;