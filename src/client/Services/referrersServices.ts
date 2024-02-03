import axios from "axios";

const baseURL = "http://localhost:3001/api";

const getAllReferrers = () => {
  return axios.get(`${baseURL}/referrers`).then((res) => res.data);
};

const getReferrersById = (id: string) => {
  return axios.get(`${baseURL}/referrers/${id}`).then((res) => res.data);
};

export default { getAllReferrers, getReferrersById };
