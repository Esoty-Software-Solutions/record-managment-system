import axios from "axios";
export default axios.create({
  baseURL: "https://testdalil.onrender.com/v1/", //new URL
  // baseURL: "https://dalilserver.onrender.com/v1", // old url
});
