import React from "react";
import Container from "../Container";
import styles from "./styles.module.css";

export default ({ children }) => (
  <main className={styles.main}>
    <Container>{children}</Container>
  </main>
);
