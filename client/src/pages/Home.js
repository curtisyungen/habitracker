import React from 'react';

import { useAuth0 } from "@auth0/auth0-react";

import { HabitList } from "../components";

import "./Home.css";
import "../styles/main.css";

const Home = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <div className="page page-home">
            {isAuthenticated ? (
                <>
                    <div>Profile</div>

                    <div>
                        <p>Today</p>
                        <HabitList />
                    </div>

                </>
            ) : (
                <div>Not logged in.</div>
            )}
        </div>
    )
}

export default Home;
