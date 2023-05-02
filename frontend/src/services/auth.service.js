import axios from "axios";
import {
  SignUpUrl,
  LogInUrl,
  SingOutUrl,
  getDataByName,
  updateJobUrl,
  getUserRoleUrl,
  getUserJobUrl,
} from "../constants/url.constants";
import jwtDecode from "jwt-decode";

const register = (username, email, password) => {
  return axios.post(SignUpUrl, {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  try {
    const response = await axios.post(LogInUrl, {
      username,
      password,
    });
    if (response.data) {
      const decodedToken = jwtDecode(response.data.token);
      const username =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
      await getData(username);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateJobStatus = async (id, data) => {
  console.log(data);
  axios
    .put(`${updateJobUrl}/${id}`, data)
   
    .catch((error) => alert("Error"));
  return;
};
const getData = async (user) => {
  if (!user) {
    alert("User not found");
    return;
  }
  try {
    const response = await axios.get(getDataByName + user);
    console.log(response.data.responseData);
    localStorage.setItem("user", JSON.stringify(response.data.responseData));
  } catch (error) {
    alert("An Error Happend on fetching..");
  }
};

const getUserJob = async (id) => {
  try {
    const response = await axios.get(getUserJobUrl + id);
    return response.data.responseData;
  } catch (error) {
    return error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
  console.log(localStorage.getItem("user"));
  // return axios.post(SingOutUrl).then((response) => {
  //   return response.data;
  // });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentUserRole = async (id) => {
  const response = await axios.get(getUserRoleUrl + id.toString());
  return response.data;
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserRole,
  getUserJob,
  updateJobStatus,
};

export default AuthService;
