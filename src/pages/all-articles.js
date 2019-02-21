import React, { Component } from "react";
import { Layout } from "../components";
import { Article } from "../components";
import { Container } from "../components";
import articles from "../data/articles";
import styles from "./all-articles.module.css";

class AllArticles extends Component {
  state = {
    shownArticles: articles
  };

  searchArticles = () => {
    this.setState({ shownArticles: articles.filter(article => article.title.toLowerCase().startsWith(this.search.value)) });
  };

  render() {
    return (
      <Layout>
        <Container className={styles.articlespage}>
          <h1 className={styles.title}>All articles</h1>
          <div className={styles.searchbox}>
            <input type="text" placeholder="Search..." ref={input => this.search = input} onChange={this.searchArticles} />
          </div>
          <Container className={styles.allarticles}>
            {this.state.shownArticles.filter(article => article.isSpecial).map(article => <Article {...article}><img src={require('../assets/percent.jpg')} /></Article>)}
            {this.state.shownArticles.filter(article => !article.isSpecial).map(article => <Article {...article}/>)}
          </Container>
        </Container>
      </Layout>
    );
  }
}

export default AllArticles;