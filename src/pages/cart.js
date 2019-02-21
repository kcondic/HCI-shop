import React, { Component } from "react";
import { Layout, Container } from "../components";
import styles from "./cart.module.css";
import articles from "../data/articles";

class Cart extends Component {
  
  state = {
      order: [],
      total: 0,
      isLoggedIn: false
    };

  componentDidMount() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart)
    {
      this.setState({
        order: cart.map(artId => articles.find(article => article.id === artId))
      });
      this.setState({
        total: cart.map(artId => articles.find(article => article.id === artId).price).map(price => parseInt(price)).reduce(function(a, b) { return a + b; }, 0)
      });
    }

    let auth = localStorage.getItem('authentication');

    if(auth === '1')
      this.setState({
        isLoggedIn: true
      });
  }
  
  checkout = () => {
    //localStorage.removeItem('cart');
    this.setState({
      order: []
    });
    this.setState({
      total: 0
    });
  }

  removeFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart || cart.indexOf(id) === -1)
        return;

    cart.splice(cart.indexOf(id), 1);

    this.setState({
      order: cart.map(artId => articles.find(article => article.id === artId))
    });
    this.setState({
      total: cart.map(artId => articles.find(article => article.id === artId).price).map(price => parseInt(price)).reduce(function(a, b) { return a + b; }, 0)
    });

    localStorage.setItem('cart', JSON.stringify(cart));
};
  
  render() {
    return (
      <Layout>
        <Container className={styles.order}>
          {this.state.order.map((orderItem, index) => 
            <Container className={styles.orderitem}>
              <div>{index+1}. {orderItem.title}</div>
              <div>{orderItem.subtitle}</div>
              <div className={styles.price}>{orderItem.price}$</div>
              <div className={styles.removeorderitem} onClick={() => this.removeFromCart(orderItem.id)}></div>
            </Container>)}
            <Container className={styles.total}>
             { this.state.total > 0 && <span>TOTAL: {this.state.total}$</span>}
            </Container>
          { this.state.isLoggedIn && this.state.total > 0 && <button className={styles.checkoutbutton} onClick={this.checkout}>CHECKOUT</button> }
          { this.state.total === 0 && <span>There aren't any items in the cart at the moment.</span> }
        </Container>
      </Layout>
    );
  }
}
  
export default Cart;