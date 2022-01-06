import React from "react";
import styled from "styled-components";

import { IMAGES } from "../images";
import { SITE_TITLE, SIZE } from "../res";
import { FONT_SIZE } from "../styles/theme";

const Logo = styled("img")`
    aspect-ratio: 1;
    height: 35px;
    object-fit: cover;
    width: 35px;
`;

const LogoContainer = styled("div")`
    display: flex;
    margin-left: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`;

const NavbarContainer = styled("div")`
    border: 0px;
    border-bottom-width: 1px;
    border-style: solid;
    font-size: ${FONT_SIZE.M};
    height: ${SIZE.NAVBAR_HEIGHT};
    min-width: 100vw;
    position: relative;
    width: 100%;
`;

const Title = styled("div")`
    font-size: ${FONT_SIZE.L};
    height: 100%;
    line-height: 35px;
    margin-left: 5px;
`;

const Navbar = () => {
    return (
        <NavbarContainer className="background borderColor">
            <LogoContainer>
                <Logo src={IMAGES.LOGO} alt="logo" />
                <Title>{SITE_TITLE}</Title>
            </LogoContainer>
        </NavbarContainer>
    );
};

export default Navbar;
