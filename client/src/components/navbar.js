import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

import { SITE_TITLE, SIZE } from "../res";
import { COLORS, FONT_SIZE } from "../styles/theme";

const NavbarContainer = styled("div")`
    height: ${SIZE.NAVBAR_HEIGHT};
    min-width: 100vw;
    width: 100%;
`;

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth0();
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = (shouldShow) => {
        setShowSettings(shouldShow);
    }

    return (
        <NavbarContainer className="background">

        </NavbarContainer>
    );
}

export default Navbar;
