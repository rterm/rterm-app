import * as actions from "../constants/actions";
import serverstatus from "../utils/status";
import api from "../utils/api";
import {ShowMessageStatus} from "../utils/ui";

export const SetProjectList = (data: any) => ({
  type: actions.SET_PROJECT_LIST,
  data,
});

export const SetCurrentProjectInfo = (data: any) => ({
  type: actions.SET_CURRENT_PROJECT_INFO,
  data,
});

export function GetProjectList(): any {
  return (dispatch: any) => {
    api
      .get("/api/v1/action/project_list")
      .then(function (response: any) {
        if (response.data.status === serverstatus.SUCCESS) {
          let _list: any[] = [];
          for (let i in response.data.list) {
            _list.push({
              project: response.data.list[i].name,
              owner: "",
              date: response.data.list[i].updated_at,
            });
          }
          dispatch(SetProjectList(_list));
        }
      })
      .catch(function (error: any) {
        if (error.response) {
          ShowMessageStatus(error.response.data, null, null);
        } else {
          console.error("Error Message:", error.message);
        }
      });
  };
}

export function GetProjectInfo(params: any): any {
  return (dispatch: any) => {
    const options = {
      params: params,
    };
    api
      .get("/api/v1/action/project_info", options)
      .then(function (response: any) {
        if (response.data.status === serverstatus.SUCCESS) {
          const _info = {
            FulfillmentURL: response.data.info.FulfillmentURL,
            AccountLinking: {
              ClientID: response.data.info.ClientID,
              ClientSecret: response.data.info.ClientSecret,
              AuthorizationURL: response.data.info.AuthorizationURL,
              TokenURL: response.data.info.TokenURL,
            },
          };
          dispatch(SetCurrentProjectInfo(_info));
        }
      })
      .catch(function (error: any) {
        if (error.response) {
          ShowMessageStatus(error.response.data, null, null);
        } else {
          console.error("Error Message:", error.message);
        }
      });
  };
}

export function CreateActions(body: any): any {
  return () => {
    return new Promise(async (resolve, reject) => {
      api
        .post("/api/v1/action", JSON.stringify(body))
        .then(function (response: any) {
          ShowMessageStatus(response.data, "Creating project successfully", {
            code: serverstatus.DB_DUPLICATE_KEY,
            msg: "Duplicate project name",
          });
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
    });
  };
}

export function UpdateActions(body: any): any {
  return () => {
    api
      .put("/api/v1/action", JSON.stringify(body))
      .then(function (response: any) {
        ShowMessageStatus(response.data, "Update actions successfully", {
          code: serverstatus.HTTP_BODY_INVALID,
          msg: "Nothing project name",
        });
      })
      .catch(function (error: any) {
        if (error.response) {
          ShowMessageStatus(error.response.data, null, null);
        } else {
          console.error("Error Message:", error.message);
        }
      });
  };
}

export function DeleteActions(params: any): any {
  return (dispatch: any) => {
    const options = {
      params: params,
    };
    api
      .delete("/api/v1/action", options)
      .then(function (response: any) {
        ShowMessageStatus(response.data, "Delete actions successfully", {
          code: serverstatus.HTTP_QUERY_INVALID,
          msg: "Nothing project name",
        });
        if (response.data.status === serverstatus.SUCCESS) {
          dispatch(GetProjectList());
        }
      })
      .catch(function (error: any) {
        if (error.response) {
          ShowMessageStatus(error.response.data, null, null);
        } else {
          console.error("Error Message:", error.message);
        }
      });
  };
}
