import React, { useEffect } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { navigate } from "hookrouter";

import { Loading } from "../components";

const LoginRedirect = () => {
    useEffect(() => {
        navigate("/");
    });

    return <Loading />;
};

export default withAuthenticationRequired(LoginRedirect, {
    onRedirecting: () => <Loading />,
});
