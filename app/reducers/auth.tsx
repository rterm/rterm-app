import * as auth from "../constants/auth";
import Cookies from "js-cookie";

const INIT_STATE = {
  AccessToken: Cookies.get("token"),
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case auth.SET_TOKEN:
      return Object.assign({}, state, {
        AccessToken: action.data,
      });

    default:
      return state;
  }
};
