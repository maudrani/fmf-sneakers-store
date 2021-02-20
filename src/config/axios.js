import axios from "axios";

const clienteAxios = axios.create({
  baseURL: " http://localhost:4000/",
  /* baseURL: "https://gentle-everglades-34679.herokuapp.com/", */
});

export default clienteAxios;
