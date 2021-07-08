import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';
import './index.css';

const domain = process.env.REACT_APP_AUTH0_DOMAIN || "dev-sjy6qpev.us.auth0.com";
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "gw8kILOU1QVBI7iI2cwNGZp0zBNOV9Cg";

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={`${window.location.origin}/loginRedirect`}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
