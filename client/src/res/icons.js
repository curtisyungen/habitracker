import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChevronDown,
    faEdit,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faChevronDown,
    faEdit,
    faQuestion,
)

export function getIcon(name, classes) {
    switch (name.toLowerCase()) {
        case "chevdown":
            return <FontAwesomeIcon className={classes} icon={faChevronDown} />;
        case "edit":
            return <FontAwesomeIcon className={classes} icon={faEdit} />
        default:
            return <FontAwesomeIcon className={classes} icon={faQuestion} />;
    }
}