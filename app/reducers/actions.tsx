import * as actions from "../constants/actions";

const INIT_STATE = {
  TableData: [],
  CurrentProjectInfo: {
    FulfillmentURL: "",
    AccountLinking: {
      ClientID: "",
      ClientSecret: "",
      AuthorizationURL: "",
      TokenURL: "",
    },
  },
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case actions.SET_PROJECT_LIST:
      return Object.assign({}, state, {
        TableData: action.data,
      });
    case actions.SET_CURRENT_PROJECT_INFO:
      return Object.assign({}, state, {
        CurrentProjectInfo: action.data,
      });
    default:
      return state;
  }
};
