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
    faQuestion
);

export const ICON = {
    ADD: faPlus,
    CHECK: faCheckCircle,
    CHEVRON_DOWN: faChevronDown,
    EDIT: faEdit,
    LEFT: faChevronLeft,
    RIGHT: faChevronRight,
    QUESTION: faQuestion,
};

export default class IconHelper {
    getIcon(icon) {
        if (!icon) return <FontAwesomeIcon icon={ICON.QUESTION} />;
        return <FontAwesomeIcon icon={icon} />;
    }
}
