import axios from "axios";
import {
  SignUpUrl,
  LogInUrl,
  SingOutUrl,
  getDataByName,
  getUserRoleUrl,
} from "../constants/url.constants";
import jwtDecode from "jwt-decode";

const register = (username, email, password) => {
  return axios.post(SignUpUrl, {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(LogInUrl, {
      username,
      password,
    })
    .then((response) => {
      if (response.data) {
        const decodedToken = jwtDecode(response.data.token);
        const username =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ];
        getData(username);
      }
      return response.data;
    });
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

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(SingOutUrl).then((response) => {
    return response.data;
  });
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
};

export default AuthService;
