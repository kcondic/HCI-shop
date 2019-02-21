import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components";
import { Article } from "../components";
import { Container } from "../components";
import articles from "../data/articles";
import styles from "./index.module.css";

export default ({
  data: {
    site: {
      siteMetadata: { title, description }
    }
  }
}) => {
  return (
    <Layout>
      <Container className={styles.mainpage}>
        <h1 className>{title}</h1>
        <p>{description}</p>
        <p className={styles.today}>Today's offers</p>
        <Container className={styles.todaysoffers}>
          {articles.filter(article => article.isSpecial).map(article => <Article {...article}><img src={require('../assets/percent.jpg')} /></Article>)}
        </Container>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
