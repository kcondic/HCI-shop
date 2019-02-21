import React, { Component } from "react";
import styles from "./styles.module.css";
import { Link } from "gatsby";

class Article extends Component {
    state = {
        isInCart: false
    };

    componentDidMount() {
        let cart = JSON.parse(localStorage.getItem('cart'));

        if(!cart)
            return;

        if(cart.indexOf(this.props.id) !== -1)
            this.setState({
                isInCart: true
            });
        else
            this.setState({
                isInCart: false
            });
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
            isInCart: true
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    removeFromCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'));

        if(!cart || cart.indexOf(id) === -1)
            return;

        cart.splice(cart.indexOf(id), 1);

        this.setState({
            isInCart: false
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    render() {
      const {
        children, id, imageName, title, subtitle, price
      } = this.props;
      return (
        <figure className={styles.card}>
            <Link className={styles.link} to="/article-details" state={{props: {id: id}}}>
                <img src={require(`../../assets/articles/${imageName}`)} />
            </Link>
            <figcaption>
                <Link className={styles.link} to="/article-details" state={{props: {id: id}}}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subtitle}>{subtitle}</div>
                </Link>
                <div>
                    <span className={styles.price}>{price}$</span>
                    {!this.state.isInCart && <button className={styles.addbutton} onClick={() => this.addToCart(id)}>ADD</button>}
                    {this.state.isInCart && <button className={styles.removebutton} onClick={() => this.removeFromCart(id)}>REMOVE</button>}
                </div>
                {children}
            </figcaption>
        </figure>
      );
    }
  }
  
  export default Article;