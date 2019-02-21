import React, { Component } from "react";
import { Layout, Container } from "../components";
import validuser from "../data/auth";
import styles from "./login.module.css";
import { navigate } from "gatsby";

class Login extends Component {
  
  state = {
      username: "",
      usernameValid: true
    };

  componentDidMount() {
    let auth = localStorage.getItem('authentication');
    if(auth === '1')
      navigate("/cart");
  }
  
  login = (e) => {
    e.preventDefault();
    if(this.username.value === validuser)
    {
      localStorage.setItem('authentication', '1');
      navigate("/cart");
    }
    else
      this.setState({
        usernameValid: false
      })
  }
  
  render() {
    return (
      <Layout>
        <Container className={styles.login}>
          <form onSubmit={this.login}>
            <input type="text" placeholder="Korisničko ime" ref={input => this.username = input} />
            <button type="submit">LOGIN</button>
            {!this.state.usernameValid && <span className={styles.error}>Neispravan unos.</span>}
          </form>
        </Container>
      </Layout>
    );
  }
}
  
export default Login;