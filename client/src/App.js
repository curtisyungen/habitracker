import React from "react";

import Routes from "./Router";
import { useRoutes } from "hookrouter";

import { useAuth0 } from "@auth0/auth0-react";

import { Navbar } from "./components";

import './App.css';

function App() {
  const { error, isLoading } = useAuth0();

  const routeResult = useRoutes(Routes);

  if (error) return <div>Error: {error.message}</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="App">
      <Navbar />
      {routeResult}
    </div>
  );
}

export default App;
