import React from "react";
import { useState } from "react";
import { Form, FormGroup, Button, Input, Row } from "reactstrap";
import { Navigate } from "react-router-dom";

import { connect } from "react-redux";

function Login(props) {
  const [isLogged, setIsLogged] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInMessage, setSigninMessage] = useState("");

  async function handleSubmitSignUp() {
    console.log("SIGN UP FROM FRONT");
    await fetch("/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "userName=" +
        signUpUsername +
        "&email=" +
        signUpEmail +
        "&password=" +
        signUpPassword,
    })
      .then((data) => data.json())
      .then((reponse) => {
        setSubmitMessage(reponse.message);
        if (reponse.result) {
          setSubmitMessage(reponse.message);
          setSignUpUsername("");
          setSignUpEmail("");
          setSignUpPassword("");
        }
      });
  }

  async function handleSubmitSignIn() {
    console.log(
      "🚀 ~ file: login.js ~ line 49 ~ handleSubmitSignIn ~ signInPassword",
      signInPassword
    );

    await fetch("/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "email=" + signInEmail + "&password=" + signInPassword,
    })
      .then((data) => data.json())
      .then((reponse) => {
        console.log("🚀 ~ file: login.js ~ line 58 ~ .then ~ result", reponse);
        if (reponse.result) {
          setIsLogged(true);
          props.signin(reponse.data.user.token);
        } else {
          setSigninMessage(reponse.message);
        }
      });
  }

  if (isLogged) {
    return <Navigate to="/setupGame" />;
  }

  return (
    <div className="home">
      <Row className="row">
        <div className="col-12 text-center get_started">
          <h2>Yams!</h2>
        </div>

        <div className="col-12 col-sm-6 text-center">
          <FormGroup>
            <h4 className="titleForm">Sign Up</h4>

            <Form action="/sign-up" method="POST">
              <FormGroup>
                <label>Username</label>
                <Input
                  type="text"
                  name="userName"
                  className="form-control"
                  placeholder="Enter username"
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  value={signUpUsername}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <label>Email address</label>
                <Input
                  type="email"
                  name="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  value={signUpEmail}
                />
              </FormGroup>
              <FormGroup>
                <label>Password</label>
                <Input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  value={signUpPassword}
                />
              </FormGroup>

              <Button
                onClick={() => handleSubmitSignUp()}
                className="btn btn-info"
              >
                Submit
              </Button>
            </Form>
          </FormGroup>
          {submitMessage}
        </div>
        <div className="col-12 col-sm-6 text-center">
          <div className="formArea">
            <h4 className="titleForm">Sign In</h4>

            <form action="/sign-in" method="POST">
              <div className="form-group">
                <label>Email address</label>
                <Input
                  name="email"
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setSignInEmail(e.target.value)}
                  value={signInEmail}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => setSignInPassword(e.target.value)}
                  value={signInPassword}
                />
              </div>

              <Button
                onClick={() => handleSubmitSignIn()}
                className="btn btn-info"
              >
                Submit
              </Button>
            </form>
            {signInMessage}
          </div>
        </div>
      </Row>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    signin: function (token) {
      console.log(
        "🚀 ~ file: login.js ~ line 175 ~ mapDispatchToProps ~ token",
        token
      );
      dispatch({ type: "setToken", token });
    },
  };
}

export default connect(null, mapDispatchToProps)(Login);
