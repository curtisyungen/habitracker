import React from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const ModalContainer = ({ open, close, children }) => {
    return (
        <Modal
            open={open}
            onClose={close}
            styles={{
                closeIcon: {
                    outline: "none",
                },
                modal: {
                    margin: "0px",
                    maxWidth: "600px",
                    minHeight: "300px",
                    minWidth: "300px",
                    width: "100%",
                },
            }}
            animationDuration={0}
        >
            {children}
        </Modal>
    );
};

export default ModalContainer;
