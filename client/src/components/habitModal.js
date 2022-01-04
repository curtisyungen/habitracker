import React, { useContext, useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";

const HabitModal = ({ open, close, mode, habitData, setHabitData }) => {
    return <Modal open={open} onClose={close}></Modal>;
};

export default HabitModal;
