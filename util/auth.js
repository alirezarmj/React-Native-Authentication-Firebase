import axios from "axios";
import { API_KEY } from "@env";

// const API_KEY = "AIzaSyB9MfT5DXixN9kXoXbS9alwKzJPgS8kzuA";

export const createUser = async (email, password) => {
  const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY, {
    email,
    password,
    returnSecureToken: true,
  });
  return response.data.idToken;
};

export const Login = async (email, password) => {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY,
    {
      email,
      password,
      returnSecureToken: true,
    }
    // {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // }
  );
  return response.data.idToken;
  console.log(response.data);
};
