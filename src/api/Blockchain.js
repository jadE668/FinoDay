import { ApiConf } from "./ApiConf";

export function getActiveBlockchainNodes(callback) {
  fetch(ApiConf.baseUrl + ApiConf.getBlockChainNodes, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((jsonResponse) => {
      callback(jsonResponse);
    });
}
