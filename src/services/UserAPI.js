import axios from "axios";

export const createUserAPI = async (signUpData) => {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/signup`, signUpData);
      return response
  }

export const verifyLoginInfo = async (signInData) => {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/signin`, signInData);
      return response
  };