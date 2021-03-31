import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (userInfo, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(userInfo);
    console.log(data);
    dispatch({ type: AUTH, payload: data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (userInfo, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(userInfo);
    console.log(data);
    dispatch({ type: AUTH, payload: data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
