import React from "react";

function Grid(props) {
  if (props.myTurn)
    console.log("🚀 ~ file: grid.js ~ line 4 ~ Grid ~ props", props);
  var tableStyle = "";
  if (props.myTurn) {
    tableStyle = "table-success";
  }
  return (
    <tbody>
      <tr className={tableStyle}>
        <th>{props.name}</th>
        <td onClick={() => props.handleClick("as", props.myTurn, props.index)}>
          {props.playerGrid.as}
        </td>
        <td
          onClick={() => props.handleClick("deux", props.myTurn, props.index)}
        >
          {props.playerGrid.deux}
        </td>
        <td
          onClick={() => props.handleClick("trois", props.myTurn, props.index)}
        >
          {props.playerGrid.trois}
        </td>
        <td
          onClick={() => props.handleClick("quatre", props.myTurn, props.index)}
        >
          {props.playerGrid.quatre}
        </td>
        <td
          onClick={() => props.handleClick("cinq", props.myTurn, props.index)}
        >
          {props.playerGrid.cinq}
        </td>
        <td onClick={() => props.handleClick("six", props.myTurn, props.index)}>
          {props.playerGrid.six}
        </td>
        <td>{props.playerGrid.total}</td>
        <td>{props.playerGrid.bonus}</td>
        <td>{props.playerGrid.total1}</td>
        <td> </td>
        <td onClick={() => props.handleClick("min", props.myTurn, props.index)}>
          {props.playerGrid.min}
        </td>
        <td onClick={() => props.handleClick("max", props.myTurn, props.index)}>
          {props.playerGrid.max}
        </td>
        <td>{props.playerGrid.total2}</td>
        <td
          onClick={() => props.handleClick("petite", props.myTurn, props.index)}
        >
          {props.playerGrid.petite}
        </td>
        <td
          onClick={() => props.handleClick("grande", props.myTurn, props.index)}
        >
          {props.playerGrid.grande}
        </td>
        <td
          onClick={() => props.handleClick("full", props.myTurn, props.index)}
        >
          {props.playerGrid.full}
        </td>
        <td
          onClick={() => props.handleClick("carre", props.myTurn, props.index)}
        >
          {props.playerGrid.carre}
        </td>
        <td onClick={() => props.handleClick("yam", props.myTurn, props.index)}>
          {props.playerGrid.yam}
        </td>
        <td>{props.playerGrid.total3}</td>
        <td>{props.playerGrid.total4}</td>
      </tr>
    </tbody>
  );
}

export default Grid;
