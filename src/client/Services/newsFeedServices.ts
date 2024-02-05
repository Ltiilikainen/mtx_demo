import axios from "axios";

const baseURL = "http://localhost:3001/api";

const getAllNews = () => {
  return axios.get(`${baseURL}/news`).then((res) => res.data);
};

const getNewsById = (id: string) => {
  return axios.get(`${baseURL}/news/${id}`).then((res) => res.data);
};

const postNews = (newsItem: NewsInput) => {
  return axios.post(`${baseURL}/news`, { newsItem }).then((res) => res.data);
};

export default { getAllNews, getNewsById, postNews };
