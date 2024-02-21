import axios from "axios";

const baseURL = "http://localhost:3001/api";

const sendContactForm = (formData: ContactFormData) => {
  return axios.post(`${baseURL}/contact`, { formData }).then((res) => res.data);
};

export default { sendContactForm };
