import React from "react";
import { graphql } from "gatsby";
import { Layout, Catalogs, Container } from "../components";
import styles from "./catalogs.module.css";

export default ({
  data: {
    allMarkdownRemark: { edges: catalogs }
  }
}) => {
  return (
    <Layout>
      <Container className={styles.catalogspage}>
        <h1>Catalogs</h1>
        <Catalogs className={styles.catalogs} catalogs={catalogs} />
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            slug
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`;