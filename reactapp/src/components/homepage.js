import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Form, FormGroup, Row, Col, Label } from "reactstrap";
import { useEffect } from "react";

import { connect } from "react-redux";

function Homepage(props) {
  const [userName, setUserName] = useState([]);
  const [number, setNumber] = useState(1);
  const [canEnter, setCanEnter] = useState(false);
  const [playerGrid, setPlayerGrid] = useState([]);

  function handleClick() {
    props.setName(userName);

    var req = "/create-grid";
    fetch(req, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "token=" + props.token + "&playerNames=" + JSON.stringify(userName),
    });

    setCanEnter(true);
  }

  useEffect(() => {
    var req = "/get-player-grid";
    fetch(req, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: { token: props.token },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlayerGrid(data.grids);
      });
  }, []);

  if (canEnter) {
    return <Navigate to="/game" />;
  }

  var tmpLobby = playerGrid.map((element, i) => (
    <Row key={i}>
      <div>{element.gameName}</div>
    </Row>
  ));

  function changeName(name, index) {
    var tmpUserName = [...userName];
    tmpUserName[index] = name;
    setUserName(tmpUserName);
  }

  var nameForm = [];
  for (let i = 0; i < number; i++) {
    var form = (
      <FormGroup key={i}>
        <Label>
          Name:
          <input
            key={i}
            type="text"
            value={userName[i]}
            onChange={(e) => changeName(e.target.value, i)}
          />
          <br></br>
        </Label>
      </FormGroup>
    );
    nameForm.push(form);
  }

  return (
    <Row>
      <Col>
        <Row>My Lobbies</Row>
        {tmpLobby}
      </Col>
      <Col>
        <div>
          <Form>
            <FormGroup>
              <Label>Number of Player : </Label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="4"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
              ></input>
            </FormGroup>

            {nameForm}
            <Button type="submit" value="Submit" onClick={() => handleClick()}>
              Create New Lobby
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

function mapStateToProps(state) {
  console.log(
    "🚀 ~ file: homepage.js ~ line 117 ~ mapStateToProps ~ state",
    state
  );
  return { token: state.token, userName: state.nameList };
}

function mapDispatchToProps(dispatch) {
  return {
    setName: function (name) {
      dispatch({ type: "setName", name });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
