import React, { useState } from "react";
import styled from "styled-components";

import { SITE_TITLE, SIZE } from "../res";
import { COLORS, FONT_SIZE } from "../styles/theme";

const NavbarContainer = styled("div")`
    border: 0px;
    border-bottom-width: 1px;
    border-style: solid;
    font-size: ${FONT_SIZE.M};
    height: ${SIZE.NAVBAR_HEIGHT};
    min-width: 100vw;
    width: 100%;
`;

const Navbar = () => {
    return (
        <NavbarContainer className="background borderColor">{SITE_TITLE}</NavbarContainer>
    );
};

export default Navbar;
