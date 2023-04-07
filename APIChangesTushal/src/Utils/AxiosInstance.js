import axios from "axios";
export default axios.create({
  // baseURL: "http://18.213.164.12:3000/v1/", //new URL
  baseURL: "http://dalildev.esoty.ca/v1/", //new URL
  // baseURL: "http://dalildev.esoty.ca/v1/", //new URL
  // baseURL: "https://testdalil.onrender.com/v1/", //new URL
  // baseURL: "https://dalilserver.onrender.com/v1", // old url
});
