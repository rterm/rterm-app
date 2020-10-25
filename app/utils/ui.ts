import {Message} from "element-react";
import serverstatus from "../utils/status";

/*
 * data:
 * SuccessMsg: success message
 * error_msg: error message
 */
function ShowMessageStatus(data: any, SuccessMsg: any, ErrorMsg: any) {
  if (data.status === serverstatus.SUCCESS) {
    Message({
      message: SuccessMsg === null ? data.msg : SuccessMsg,
      type: "success",
      duration: 2000,
    });
  } else if (data.status === serverstatus.ERROR) {
    if (Array.isArray(ErrorMsg) && typeof ErrorMsg === "object") {
      for (let i in ErrorMsg) {
        if (data.code === ErrorMsg[i].code) {
          Message({
            message: ErrorMsg[i].msg,
            type: "error",
            duration: 2000,
          });
          return;
        }
      }
    }
    if (
      Array.isArray(ErrorMsg) === false &&
      ErrorMsg !== null &&
      typeof ErrorMsg === "object"
    ) {
      Message({
        message: data.code === ErrorMsg.code ? ErrorMsg.msg : data.msg,
        type: "error",
        duration: 2000,
      });
    } else if (ErrorMsg !== null && typeof ErrorMsg === "string") {
      Message({
        message: ErrorMsg,
        type: "error",
        duration: 2000,
      });
    } else if (data.code === serverstatus.TOKEN_HAS_EXPIRED) {
      Message({
        message: "Token has expired",
        type: "error",
        duration: 2000,
      });
    } else if (data.code === serverstatus.WRONG_REGISTER_INFORMATION) {
      Message({
        message: "Wrong registration information",
        type: "error",
        duration: 2000,
      });
    } else if (data.code === serverstatus.DB_DUPLICATE_KEY) {
      Message({
        message: "DB duplicate key",
        type: "error",
        duration: 2000,
      });
    } else {
      Message({
        message: data.msg === undefined ? "Unknown error" : data.msg,
        type: "error",
        duration: 2000,
      });
    }
  }
}

export {ShowMessageStatus};
