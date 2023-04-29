import Axios from "axios";

const url = "http://localhost:5000";
// const url = "";

export const authenticApi = async (payload: any) => {
  const axios = Axios.create({
    baseURL: url,
    headers: {
      "Content-type": "application/json",
    },
  });
  const res = axios(payload.url, {
    method: payload.method,
    data: payload.data,
  });

  return res;
};
