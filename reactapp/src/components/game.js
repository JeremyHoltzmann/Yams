import React from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Dice from "./dice";
import Grid from "./grid";
import { Button, Col, Container, Row, Table } from "reactstrap";
import yamsAllRules from "../yamsRuleChecker";

function Game(props) {
  console.log("🚀 ~ file: game.js ~ line 11 ~ Game ~ props", props);
  var yamRuleClass = new yamsAllRules();
  const [gameName, setGameName] = useState("");
  const [diceArray, setDiceArray] = useState([
    {
      faceValue: generateRandomValue(),
      launchCounter: 0,
      isLocked: false,
    },
    {
      faceValue: generateRandomValue(),
      launchCounter: 0,
      isLocked: false,
    },
    {
      faceValue: generateRandomValue(),
      launchCounter: 0,
      isLocked: false,
    },
    {
      faceValue: generateRandomValue(),
      launchCounter: 0,
      isLocked: false,
    },
    {
      faceValue: generateRandomValue(),
      launchCounter: 0,
      isLocked: false,
    },
  ]);

  var diceTotal = diceArray.reduce((prev, curr) => prev + curr.faceValue, 0);
  const [total, setTotal] = useState(diceTotal);
  const [bravoMessage, setBravoMessage] = useState("");
  const [playerCount, setPlayerCount] = useState(0);

  const playerGridObject = {
    player: 0,
    as: 0,
    deux: 0,
    trois: 0,
    quatre: 0,
    cinq: 0,
    six: 0,
    total: 0,
    bonus: 0,
    total1: 0,
    min: 0,
    max: 0,
    total2: 0,
    petite: 0,
    grande: 0,
    full: 0,
    carre: 0,
    yam: 0,
    total3: 0,
    total4: 0,
  };

  const [playerTurn, setPlayerTurn] = useState(0);

  var tmpPlayerGrid = [];
  console.log(
    "🚀 ~ file: game.js ~ line 75 ~ Game ~ playerNames",
    props.playerNames
  );

  for (var i = 0; i < props.playerNames.length; i++) {
    tmpPlayerGrid.push(playerGridObject);
  }

  const [playerGrid, setPlayerGrid] = useState(tmpPlayerGrid);

  var tmpGridTotal = [];
  for (var i = 0; i < tmpPlayerGrid.length; i++) {
    tmpGridTotal.push(
      <Grid
        index={i}
        myTurn={i === playerCount}
        handleClick={handleGridClick}
        playerGrid={playerGrid[i]}
        name={props.playerNames[i]}
      ></Grid>
    );
  }

  function generateRandomValue() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function launchDice() {
    if (playerTurn === 2) return;
    if (playerTurn !== 2) setPlayerTurn((playerTurn + 1) % 3);
    var tmpArray = [];
    var tmpTotal = 0;
    setBravoMessage("");
    for (var i = 0; i < diceArray.length; i++) {
      var dice = diceArray[i];
      if (diceArray[i].isLocked) {
        tmpTotal += dice.faceValue;
      } else {
        var rdn = generateRandomValue();
        tmpTotal += rdn;
        dice.faceValue = rdn;
        dice.launchCounter++;
      }

      tmpArray.push(dice);
    }
    setTotal(tmpTotal);
    setDiceArray(tmpArray);
  }

  function checkTotals(property, score) {
    var tmpGrid = { ...playerGrid[playerCount] };

    tmpGrid[property] = score;
    if (tmpGrid.min !== 0 && tmpGrid.max !== 0) {
      tmpGrid.total2 = tmpGrid.min + tmpGrid.max;
    }
    if (
      tmpGrid.as !== 0 &&
      tmpGrid.deux !== 0 &&
      tmpGrid.trois !== 0 &&
      tmpGrid.quatre !== 0 &&
      tmpGrid.cinq !== 0 &&
      tmpGrid.six !== 0
    ) {
      tmpGrid.total =
        tmpGrid.as +
        tmpGrid.deux +
        tmpGrid.trois +
        tmpGrid.quatre +
        tmpGrid.cinq +
        tmpGrid.six;
    }
    if (tmpGrid.total >= 63) {
      tmpGrid.bonus = 35;
    }
    if (tmpGrid.total !== 0) {
      tmpGrid.total1 = tmpGrid.total + tmpGrid.bonus;
    }
    if (
      tmpGrid.petite !== 0 &&
      tmpGrid.grande !== 0 &&
      tmpGrid.full !== 0 &&
      tmpGrid.carre !== 0 &&
      tmpGrid.yam !== 0
    ) {
      tmpGrid.total3 =
        tmpGrid.petite +
        tmpGrid.grande +
        tmpGrid.full +
        tmpGrid.carre +
        tmpGrid.yam;
    }
    if (
      tmpGrid.total !== 0 &&
      tmpGrid.total1 !== 0 &&
      tmpGrid.total2 !== 0 &&
      tmpGrid.total3 !== 0
    ) {
      tmpGrid.total4 =
        tmpGrid.total + tmpGrid.total1 + tmpGrid.total2 + tmpGrid.total3;
    }
    return tmpGrid;
  }

  function checkYamRule(property) {
    var rule = yamRuleClass.ruleArray.find(
      (element) => element.rule.id === property
    );
    //si score function null return value

    if (rule.rule.ruleCheckerFunction(diceArray, rule.rule.value)) {
      if (rule.rule.scoreCalculatorFunction) {
        var score = rule.rule.scoreCalculatorFunction(diceArray);

        return score;
      } else return rule.rule.value;
    }
    return 0;
  }

  async function handleGridClick(property, myTurn, index) {
    if (!myTurn) return;
    var score = checkYamRule(property);
    if (score === 0) return;

    var tmpGrid = checkTotals(property, score);
    var tmpArray = [...diceArray];
    tmpArray.forEach((element) => {
      element.isLocked = false;
      element.faceValue = generateRandomValue();
    });

    setPlayerTurn(0);
    setDiceArray(tmpArray);

    var tmp = playerGrid;
    tmp[index] = tmpGrid;
    setPlayerCount((playerCount + 1) % props.playerNames.length);
    setPlayerGrid(tmp);
    await fetch("/save-grid", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "grid=" +
        JSON.stringify(tmp) +
        "&gameName=" +
        gameName +
        "&token=" +
        props.token,
    });
  }

  function updateDice(i) {
    let array = [...diceArray];
    let element = array[i];
    array[i].isLocked = !element.isLocked;
    setDiceArray(array);
  }

  var tmpArray = diceArray.map((element, i) => (
    <Col key={i}>
      <Dice
        key={i}
        launchCounter={element.launchCounter}
        faceValue={element.faceValue}
        isLocked={element.isLocked}
        handleDice={updateDice}
        index={i}
      ></Dice>
    </Col>
  ));
  console.log(
    "🚀 ~ file: game.js ~ line 289 ~ Game ~ tmpGridTotal",
    tmpGridTotal
  );

  return (
    <Container fluid className="justify-content-center">
      <Row key="1" className="text-center">
        <input onChange={(e) => setGameName(e.target.value)} value={gameName} />
        <Button onClick={() => launchDice()} size="lg">
          Launch Dice
        </Button>
        <div>Turn {playerTurn}</div>
        <div>Total {total}</div>
        <div>{bravoMessage}</div>
      </Row>
      <Row key="2">{tmpArray}</Row>
      <Row key="3">
        <Table bordered>
          <thead>
            <tr>
              <th>Joueur</th>
              <th>AS</th>
              <th>DEUX</th>
              <th>TROIS</th>
              <th>QUATRE</th>
              <th>CINQ</th>
              <th>SIX</th>
              <th>TOTAL</th>
              <th>BONUS</th>
              <th>TOTAL I</th>
              <th></th>
              <th>MINIMUM</th>
              <th>MAXIMUM</th>
              <th>TOTAL 2</th>
              <th>Petite Suite</th>
              <th>Grande Suite</th>
              <th>Full</th>
              <th>Carre</th>
              <th>YAM</th>
              <th>TOTAL 3</th>
              <th>TOTAL 4</th>
            </tr>
          </thead>
          {tmpGridTotal}
        </Table>
      </Row>
    </Container>
  );
}

function mapStateToProps(state) {
  console.log("🚀 ~ file: game.js ~ line 297 ~ mapStateToProps ~ state", state);
  return { token: state.token, playerNames: state.playerList };
}

export default connect(mapStateToProps, null)(Game);
