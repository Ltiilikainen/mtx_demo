import axios from "axios";

const baseURL = "http://localhost:3001/api";

const getAllNews = (limit?: number) => {
  return axios
    .get(`${baseURL}/news${limit ? "?limit=" + limit : ""}`)
    .then((res) => res.data);
};

const getNewsById = (id: string) => {
  return axios.get(`${baseURL}/news/${id}`).then((res) => res.data);
};

const postNews = (newsItem: NewsInput) => {
  return axios.post(`${baseURL}/news`, { newsItem }).then((res) => res.data);
};

const updateNews = (id: string, info: NewsInput) => {
  return axios.put(`${baseURL}/news/${id}`, { info }).then((res) => res.data);
};

const deleteNews = (id: string) => {
  return axios.delete(`${baseURL}/news/${id}`).then((res) => res.data);
};

export default { getAllNews, getNewsById, postNews, updateNews, deleteNews };
