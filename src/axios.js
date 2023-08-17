import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:3030",
});

export default customAxios;
