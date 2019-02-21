import React from "react";
import SiteContainer from "../SiteContainer";
import Main from "../Main";
import Header from "../Header";
// eslint-disable-next-line
import _ from "../../styles/index.css";

export default ({ children }) => (
  <SiteContainer>
    <Header />
    <Main>{children}</Main>
  </SiteContainer>
);
