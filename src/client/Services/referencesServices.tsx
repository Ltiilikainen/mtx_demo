import axios from "axios";

const baseURL = "http://localhost:3001/api";

const getAllReferences = () => {
  return axios.get(`${baseURL}/references`).then((res) => res.data);
};

const getReferencesById = (id: string) => {
  return axios.get(`${baseURL}/references/${id}`).then((res) => res.data);
};

export default { getAllReferences, getReferencesById };
