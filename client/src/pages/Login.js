import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { navigate } from "hookrouter";

import { Loading } from "../components";
import { PAGES } from "../res";

const Login = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(PAGES.HOME);
        } else {
            loginWithRedirect();
        }
    }, [isAuthenticated]);

    return <Loading />;
};

export default Login;
