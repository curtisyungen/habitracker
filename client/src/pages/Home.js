import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { HabitList } from "../components";
import { PageContainer } from '../styles';

const Home = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <PageContainer>
            {isAuthenticated ? (
                <div className="container-no-scroll">
                    <HabitList />
                </div>
            ) : (
                <div>Not logged in.</div>
            )}
        </PageContainer>
    );
}

export default Home;
