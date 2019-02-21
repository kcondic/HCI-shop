import React, { Component } from "react";
import { Layout, Container, Article } from "../components";
import articles from "../data/articles";
import styles from "./article-details.module.css";

class ArticleDetails extends Component {
  
state = {
    article: {},
    image: null,
    similarProducts: [],
    isMainArticleInCart: false
    };

    componentDidMount() {
        if(this.props.location.state != null){
        let props = this.props.location.state.props;
        let theArticle = articles.find(article => article.id === props.id);
        this.setState({
            article: theArticle
        });
        this.setState({
            image: require(`../assets/articles/${theArticle.imageName}`)
          });
        this.setState({
            similarProducts: articles.filter(article => article.category === theArticle.category && article.id !== theArticle.id).slice(0, 3)
        });

        let cart = JSON.parse(localStorage.getItem('cart'));

        if(!cart)
            return;

        if(cart.indexOf(props.id) !== -1)
            this.setState({
                isMainArticleInCart: true
            });
        }
    }

    componentDidUpdate() {
        if(this.state.article.id !== this.props.location.state.props.id)
        {
            let props = this.props.location.state.props;
            let theArticle = articles.find(article => article.id === props.id);
            this.setState({
                article: theArticle
            });
            this.setState({
                image: require(`../assets/articles/${theArticle.imageName}`)
              });
            this.setState({
                similarProducts: articles.filter(article => article.category === theArticle.category && article.id !== theArticle.id).slice(0, 3)
            });

            let cart = JSON.parse(localStorage.getItem('cart'));

            if(!cart)
                return;
    
            if(cart.indexOf(props.id) !== -1)
                this.setState({
                    isMainArticleInCart: true
                });
            else
                this.setState({
                    isMainArticleInCart: false
                });
        }
    }

    addToCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'));

        if(cart && cart.indexOf(id) !== -1)
            return;

        if(cart)
            cart.push(id);
        else
            cart = [ id ];

        this.setState({
            isMainArticleInCart: true
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    removeFromCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'));

        if(!cart || cart.indexOf(id) === -1)
            return;

        cart.splice(cart.indexOf(id), 1);

        this.setState({
            isMainArticleInCart: false
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    };

  render() {
    return (
      <Layout>
        <Container className={styles.articledetails}>
            <figure className={styles.figuremain}>
                <img src={this.state.image} />
                <figcaption>
                    <div className={styles.title}>{this.state.article.title}</div>
                    <div className={styles.subtitle}>{this.state.article.subtitle}</div>
                    <p>{this.state.article.description}</p>
                    <div>
                        <span className={styles.price}>{this.state.article.price}$</span>
                        {!this.state.isMainArticleInCart && <button className={styles.addbuttonmain} onClick={() => this.addToCart(this.state.article.id)}>ADD</button>}
                        {this.state.isMainArticleInCart && <button className={styles.removebuttonmain} onClick={() => this.removeFromCart(this.state.article.id)}>REMOVE</button>}
                    </div>
                </figcaption>
            </figure>
            <h2 className={styles.similarproductstitle}>Similar products</h2>
            {!this.state.similarProducts.length && <span className={styles.nosimilar}>No similar products.</span>}
            <Container className={styles.similarproducts}>
                {this.state.similarProducts.map(article => <Article {...article}  />)}
            </Container>
        </Container>
      </Layout>
    );
  }
}

export default ArticleDetails;