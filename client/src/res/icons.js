import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChevronDown,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faChevronDown,
    faQuestion,
)

export function getIcon(name, classes) {
    switch (name.toLowerCase()) {
        case "chevdown":
            return <FontAwesomeIcon className={classes} icon={faChevronDown} />;
        default:
            return <FontAwesomeIcon className={classes} icon={faQuestion} />;
    }
}