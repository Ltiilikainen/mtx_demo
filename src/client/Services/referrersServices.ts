import axios from "axios";

const baseURL = "http://localhost:3001/api";

const getAllReferrers = () => {
  return axios.get(`${baseURL}/referrers`).then((res) => res.data);
};

const getReferrerById = (id: string) => {
  return axios.get(`${baseURL}/referrers/${id}`).then((res) => res.data);
};

const addReferrer = (newRef: ReferrerInput) => {
  return axios
    .post(`${baseURL}/referrers`, { referrer: newRef })
    .then((res) => res.data);
};

const updateReferrer = (id: string, info: ReferrerInput) => {
  return axios
    .put(`${baseURL}/referrers/${id}`, { updatedInfo: info })
    .then((res) => res.data);
};

const deleteReferrer = (id: string) => {
  return axios.delete(`${baseURL}/referrers/${id}`).then((res) => res.data);
};

export default {
  getAllReferrers,
  getReferrerById,
  addReferrer,
  updateReferrer,
  deleteReferrer
};
