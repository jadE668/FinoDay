import { ApiConf } from "./ApiConf";

export function getCompanyDetails(callback) {
  fetch(ApiConf.baseUrl + ApiConf.companyDetails, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((jsonResponse) => {
      callback(jsonResponse);
    });
}
