import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components";
import styles from "./styles.module.css";

export default ({ data }) => {
  const { markdownRemark: catalog } = data;
  return (
    <Layout>
      <h1>{catalog.frontmatter.title}</h1>
      <section className={styles.catalogcontent}
        dangerouslySetInnerHTML={{ __html: catalog.html }}
      />
    </Layout>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        slug
        title
      }
    }
  }
`;