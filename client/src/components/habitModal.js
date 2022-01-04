import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { ModalContainer } from ".";

const HabitModal = ({ open, close, mode, habitData, setHabitData }) => {
    return <ModalContainer open={open} close={close}></ModalContainer>;
};

export default HabitModal;
