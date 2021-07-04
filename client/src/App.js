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
    <div 
      className="App" 
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3dpdHplcmxhbmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80")`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
      >
      <Navbar />
      {routeResult}
    </div>
  );
}

export default App;
