import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-responsive-modal";
import { DEFAULT, HABIT } from "../../res/main";
import { userAPI } from "../../utils";
import "./settings.css";
import "../../styles/main.css";

const Settings = ({ open, close }) => {
    const { user } = useAuth0();
    const [settings, setSettings] = useState({});

    useEffect(() => {
        userAPI.getUserSettings(user.email).then(res => {
            setSettings(res.data);
        });
    }, []);

    return (
        <Modal
            open={open}
            onClose={close}
        >
            <h4>Settings</h4>

            <div className="settingsContainer">
                
            </div>
        </Modal>
    )
}

export default Settings;
