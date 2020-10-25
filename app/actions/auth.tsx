import * as auth from "../constants/auth";
import Cookies from "js-cookie";
import {Message} from "element-react";
import serverstatus from "../utils/status";
import {ShowMessageStatus} from "../utils/ui";
import api from "../utils/api";

export const SetToken = (data: any) => ({
  type: auth.SET_TOKEN,
  data,
});

export function UserLogin(body: any): any {
  return (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      if (body.email !== "" && body.password !== "") {
        api
          .post("/api/v1/user/login", JSON.stringify(body))
          .then(function (response: any) {
            ShowMessageStatus(response.data, "Login successfully", null);
            if (response.data.status === serverstatus.SUCCESS) {
              dispatch(SetToken(response.data.access_token));
              Cookies.set("token", response.data.access_token, {
                expires: body.remember ? 365 : null,
              });
            }
            resolve(response.data);
          })
          .catch(function (error: any) {
            if (error.response) {
              ShowMessageStatus(error.response.data, null, null);
            } else {
              console.error("Error Message:", error.message);
            }
            reject(error);
          });
      } else {
        Message({
          message: "Email/password empty",
          type: "error",
          duration: 2000,
        });
      }
    });
  };
}

export function UserSignup(body: any): any {
  return () => {
    return new Promise(async (resolve, reject) => {
      if (body.email !== "" && body.password !== "") {
        api
          .post("/api/v1/user/register", JSON.stringify(body))
          .then(function (response: any) {
            ShowMessageStatus(response.data, "Signup successfully", null);
            resolve(response.data);
          })
          .catch(function (error: any) {
            if (error.response) {
              ShowMessageStatus(error.response.data, null, null);
            } else {
              console.error("Error Message:", error.message);
            }
            reject(error);
          });
      } else {
        Message({
          message: "Email/password empty",
          type: "error",
          duration: 2000,
        });
      }
    });
  };
}

export function UserLogout(): any {
  return (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      api
        .get("/api/v1/user/logout")
        .then(function (response: any) {
          console.log("UserLogout", response.data);
          dispatch(SetToken(null));
          Cookies.remove("token");
          window.location.reload();
          ShowMessageStatus(response.data, "Logout successfully", null);
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (error.response) {
            dispatch(SetToken(null));
            Cookies.remove("token");
            window.location.reload();
            ShowMessageStatus(error.response.data, null, null);
          } else {
            console.error("Error Message:", error.message);
          }
          reject(error);
        });
    });
  };
}
