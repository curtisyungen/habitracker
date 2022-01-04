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
                    maxWidth: "500px",
                    minHeight: "300px",
                    minWidth: "300px",
                },
            }}
        >
            {children}
        </Modal>
    );
};

export default ModalContainer;
