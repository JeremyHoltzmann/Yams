/* eslint-disable import/no-anonymous-default-export */
export default function (nameList = [], action) {
  if (action.type === "setName") {
    return action.name;
  }
  return nameList;
}
