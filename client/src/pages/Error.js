import React from "react";

import { PageContainer } from "../styles";

const Error = ({ message = "Page not found." }) => {
    return <PageContainer>{message}</PageContainer>;
};

export default Error;
