import Axios from "axios";

const url = "http://localhost:5000";
// const url = "";

export const authenticApi = async (payload: any, formData = false) => {
  const axios = Axios.create({
    baseURL: url,
    headers: {
      "Content-type": formData ? "multipart/form-data" : "application/json",
    },
  });
  const res = axios(payload.url, {
    method: payload.method,
    data: payload.data,
  });

  return res;
};
