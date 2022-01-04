import React, { useState } from "react";
import styled from "styled-components";

import { IMAGES } from "../images";
import { SITE_TITLE, SIZE } from "../res";
import { COLORS, FONT_SIZE } from "../styles/theme";

const Logo = styled("img")`
    aspect-ratio: 1;
    height: 35px;
    object-fit: cover;
    width: 35px;
`;

const NavbarContainer = styled("div")`
    border: 0px;
    border-bottom-width: 1px;
    border-style: solid;
    font-size: ${FONT_SIZE.M};
    height: ${SIZE.NAVBAR_HEIGHT};
    min-width: 100vw;
    width: 100%;
`;

const Title = styled("div")`
    font-size: ${FONT_SIZE.L};
    line-height: ${FONT_SIZE.L};
`;

const Navbar = () => {
    return (
        <NavbarContainer className="background borderColor">
            <Logo src={IMAGES.LOGO} alt="logo" />
            <Title>{SITE_TITLE}</Title>
        </NavbarContainer>
    );
};

export default Navbar;
