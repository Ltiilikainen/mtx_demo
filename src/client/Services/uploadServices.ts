import axios from "axios";

const baseURL = "http://localhost:3001/api";

const addUpload = (formData: FormData, filetype: string) => {
  return axios
    .post(`${baseURL}/uploads?filetype=${filetype}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then((res) => res.data);
};

const deleteUpload = (uploadId: string, cascade?: boolean) => {
  return axios
    .delete(`${baseURL}/uploads/${uploadId}${cascade ? "?cascade=true" : ""}`)
    .then((res) => res.data);
};

export default { addUpload, deleteUpload };
