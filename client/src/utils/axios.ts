import axios from "axios";
const token = JSON.parse(`${localStorage.getItem("user")}`)?.access_token;

console.log(token);

const axiosIntance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    authorization: token,
  },
});

export default axiosIntance;
