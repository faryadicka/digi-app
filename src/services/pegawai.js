import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

const fetchAPI = ({ method = "GET", endpoint, data }) => {
  const config = {
    method,
    url: `${REACT_APP_BASE_URL}${endpoint}`,
    data,
  };
  return axios(config);
};

export default fetchAPI;
