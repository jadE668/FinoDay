import { ApiConf } from "./ApiConf";

export function getUserConsignments(callback) {
  fetch(ApiConf.baseUrl + ApiConf.userConsignmentsPath, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((jsonResponse) => {
      callback(jsonResponse);
    });
}

export function getUserConsignment(id, callback) {
  fetch(ApiConf.baseUrl + ApiConf.consignmentInfoPath + id, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((jsonResponse) => {
      callback(jsonResponse);
    });
}

export function transferConsignment(id, callback) {
  fetch(ApiConf.baseUrl + ApiConf.transferConsignment + id, {
    credentials: "include",
  }).then(() => callback());
}
