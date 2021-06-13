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
                    <div className="container">Profile</div>

                    <div className="container">
                        <p>Today</p>
                        <HabitList />
                    </div>

                    <div className="container">Sidebar</div>
                </>
            ) : (
                <div>Not logged in.</div>
            )}
        </div>
    )
}

export default Home;
