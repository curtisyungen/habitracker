import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import { PAGES, VALIDATION } from "./res";

ReactDOM.render(
    <Auth0Provider
        domain={VALIDATION.AUTH0_DOMAIN}
        clientId={
            window.location.hostname === "localhost"
                ? VALIDATION.AUTH0_CLIENT_ID_LOCAL
                : VALIDATION.AUTH0_CLIENT_ID
        }
        redirectUri={`${window.location.origin}${PAGES.LOGIN_REDIRECT}`}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);
