import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiURls = {
  development: "http://localhost:4000",
  production: "LINK DO SERVIDOR DEPLOYADO VAI AQUI!!!!!!",
};

const api = axios.create({ baseURL: apiURls[process.env.NODE_ENV] });

api.interceptors.request.use((config) => {
  const loggedInUserJSON = localStorage.getItem("loggedInUser");
  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

  if (parseLoggedInUser.token) {
    console.log('entrou')
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }
  console.log(parseLoggedInUser)
  return config;
});

export { api };
