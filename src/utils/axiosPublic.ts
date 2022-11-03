import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
});
