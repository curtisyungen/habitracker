import React, { useEffect } from 'react';

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { navigate } from "hookrouter";

import { DEFAULT } from "../res/main";
import { Loading } from '../components';
import { userAPI } from "../utils";

import "../styles/main.css";

const LoginRedirect = () => {
    const { user } = useAuth0();

    useEffect(() => {
        userAPI.findOrCreateUser({
            name: user.name,
            email: user.email,
            settings: JSON.stringify(DEFAULT.SETTINGS),
            status: DEFAULT.STATUS
        }).then(() => {
            navigate("/");
        });
    });

    return (
        <div className="page page-loginRedirect">
            Redirecting...
        </div>
    )
}

export default withAuthenticationRequired(LoginRedirect, {
    onRedirecting: () => <Loading />,
});
