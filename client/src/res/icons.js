import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCheckCircle,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faEdit,
    faPlus,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faCheckCircle,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faEdit,
    faPlus,
    faQuestion,
)

export function getIcon(name, classes) {
    switch (name.toLowerCase()) {
        case "add":
            return <FontAwesomeIcon className={classes} icon={faPlus} />;
        case "check":
            return <FontAwesomeIcon className={classes} icon={faCheckCircle} />;
        case "chevdown":
            return <FontAwesomeIcon className={classes} icon={faChevronDown} />;
        case "edit":
            return <FontAwesomeIcon className={classes} icon={faEdit} />
        case "left":
            return <FontAwesomeIcon className={classes} icon={faChevronLeft} />;
        case "right":
            return <FontAwesomeIcon className={classes} icon={faChevronRight} />;
        default:
            return <FontAwesomeIcon className={classes} icon={faQuestion} />;
    }
}