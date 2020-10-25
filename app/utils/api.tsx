import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_APIURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
