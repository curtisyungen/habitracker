import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCheckCircle,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faEdit,
    faEye,
    faEyeSlash,
    faPlus,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faCheckCircle,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faEdit,
    faEye,
    faEyeSlash,
    faPlus,
    faQuestion
);

export const ICON = {
    ADD: faPlus,
    CHECK: faCheckCircle,
    CHEVRON_DOWN: faChevronDown,
    EDIT: faEdit,
    HIDDEN: faEyeSlash,
    LEFT: faChevronLeft,
    RIGHT: faChevronRight,
    QUESTION: faQuestion,
    VISIBLE: faEye,
};

export default class IconHelper {
    static getIcon(icon) {
        if (!icon) return <FontAwesomeIcon icon={ICON.QUESTION} />;
        return <FontAwesomeIcon icon={icon} />;
    }
}
