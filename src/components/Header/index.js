import React, { Component } from "react";
import NavLink from "./NavLink";
import styles from "./styles.module.css";
import { navigate } from "gatsby";
import classnames from "classnames";

class Navigation extends Component {
  state = {
    isLoggedIn: false,
    responsive: false
  };

  componentDidMount() {
    let auth = localStorage.getItem('authentication');
    if(auth === '1')
      this.setState({
        isLoggedIn: true
      });
    else
      this.setState({
        isLoggedIn: false
      });
  }

  logout = () => {
    localStorage.removeItem('authentication');
    navigate("/");
  }

  toggleMenu = () => {
    if(this.state.responsive)
      this.setState({
        responsive: false
      });
    else
      this.setState({
        responsive: true
      });
  }

  render () {
    return(
    <header>
      <nav className={classnames(styles.topnav, { [styles.responsive]: this.state.responsive })}>
        <span>HCI shop</span>
        <NavLink className={styles.navigationlink} to="/" exact="true">
          Home
        </NavLink>
        <NavLink className={styles.navigationlink} to="/all-articles">All articles</NavLink>
        <NavLink className={styles.navigationlink} to="/catalogs">Catalogs</NavLink>
        <div className= {styles.navigationlink}>
          <NavLink className={classnames(styles.navigationlink, styles.cart)} to="/cart"></NavLink>
          {!this.state.isLoggedIn && <NavLink className={classnames(styles.navigationlink, styles.loginlink)} to="/login">Login</NavLink> }
          {this.state.isLoggedIn && <button className={classnames(styles.navigationlink, styles.logout)} onClick={this.logout}>LOGOUT</button> }
        </div>
        <a className={styles.icon} onClick={() => this.toggleMenu()}>
        </a>
      </nav>
    </header>
    );
  };
}

export default Navigation;