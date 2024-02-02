import axios from "axios";

const baseURL = "http://localhost:3001/api";

const sendContactForm = () => {
  return axios.post(`${baseURL}/contact`).then((res) => res.data);
};

export default { sendContactForm };
