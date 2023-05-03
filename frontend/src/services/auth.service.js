import axios from "axios";
import {
  SignUpUrl,
  LogInUrl,
  SingOutUrl,
  getDataByName,
  updateJobUrl,
  getUserRoleUrl,
  getUserJobUrl,
  updateJobStatusUrl,
  changePasswordUrl,
  saveUserJobUrl,
  getUsersUrl,
} from "../constants/url.constants";
import jwtDecode from "jwt-decode";

const register = async (username, email, password) => {
  return await axios.post(SignUpUrl, {
    username,
    email,
    password,
  });
};

const saveUserJob = async (userId, jobId) => {
  try {
    const response = await axios.post(saveUserJobUrl, {
      userId,
      jobId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(getUsersUrl);
    console.log(response);
    return response.data;
  } catch (error) {
    return error;
  }
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

const updateJobStatus = async (id, status) => {
  await axios
    .put(`${updateJobStatusUrl}${id}`, { status })
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

const logout = async () => {
  localStorage.removeItem("user");
  console.log(localStorage.getItem("user"));
  // return axios.post(SingOutUrl).then((response) => {
  //   return response.data;
  // });
};

const changePassword = async (data) => {
  try {
    const response = await axios.post(changePasswordUrl, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUserBuId = async (id) => {
  if (!id) {
    alert("User not found");
    return;
  }
  try {
    const response = await axios.get(getDataByName + id);
    console.log(response.data.responseData);
    return response.data.responseData;
  } catch (error) {
    alert("An Error Happend on fetching..");
  }
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
  changePassword,
  getUserBuId,
  saveUserJob,
  getUsers,
};

export default AuthService;
