import { ApiConf } from "./ApiConf";

export function getNodeChain(callback) {
  fetch(ApiConf.getNodeChain)
    .then((response) => response.json())
    .then((jsonResponse) => {
      console.log(jsonResponse);
      callback(jsonResponse);
    });
}
