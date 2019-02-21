import React from "react";
import { Link } from "gatsby";
import styles from "./styles.module.css";

export default ({ catalogs }) => {
  const catalogsList = catalogs.map(catalog => {
    const { id, excerpt } = catalog.node;
    const { title, date, slug } = catalog.node.frontmatter;
    return (
      <section key={id} className={styles.catalog}>
        <h2 className={styles.title}>
          <Link to={`catalogs/${slug}`}>{title}</Link>
        </h2>
        <p className={styles.excerpt}>{excerpt}</p>
        <span className={styles.date}>{date}</span>
      </section>
    );
  });

  return catalogsList;
};
