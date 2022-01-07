import React, { useContext } from "react";
import styled from "styled-components";

import { MainContext, MAIN_ACTIONS } from "../App";
import { User } from "../classes";
import { IMAGES } from "../images";
import { SITE_TITLE, SIZE } from "../res";
import { Button } from "../styles";
import { FONT_SIZE, SCREEN_SIZE, THEME } from "../styles/theme";
import { userAPI } from "../utils";

const ButtonContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2px;
    height: ${SIZE.NAVBAR_HEIGHT};
    position: absolute;
    right: 10px;

    @media (max-width: ${SCREEN_SIZE.S}) {
        right: 0px;
    }
`;

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
    const { state, dispatch } = useContext(MainContext);

    const updateTheme = () => {
        const newTheme =
            state.currentUser.getTheme() === THEME.LIGHT
                ? THEME.DARK
                : THEME.LIGHT;
        userAPI
            .updateUser(state.currentUser.getUserId(), {
                theme: newTheme,
            })
            .then(() => {
                dispatch({
                    type: MAIN_ACTIONS.SET_CURRENT_USER,
                    currentUser: new User(
                        newTheme,
                        state.currentUser.getUserId(),
                        state.currentUser.getUserName()
                    ),
                });
            });
    };

    return (
        <NavbarContainer className="background borderColor">
            <LogoContainer>
                <Logo src={IMAGES.LOGO} alt="logo" />
                <Title>{SITE_TITLE}</Title>
            </LogoContainer>
            <ButtonContainer>
                <Button
                    className="backgroundHoverable borderColor"
                    onClick={(e) => {
                        e.preventDefault();
                        updateTheme();
                    }}
                    style={{
                        borderLeftWidth: "0px",
                        borderRightWidth: "0px",
                        borderTopWidth: "0px",
                    }}
                    width="100px"
                >
                    {state.currentUser.getTheme() === THEME.LIGHT
                        ? THEME.DARK
                        : THEME.LIGHT}{" "}
                    Theme
                </Button>
                <Button
                    className="backgroundHoverable borderColor"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch({ type: MAIN_ACTIONS.LOGOUT });
                    }}
                    style={{
                        borderLeftWidth: "0px",
                        borderRightWidth: "0px",
                        borderTopWidth: "0px",
                    }}
                    width="100px"
                >
                    Logout
                </Button>
            </ButtonContainer>
        </NavbarContainer>
    );
};

export default Navbar;
