import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (userInfo, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (userInfo, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
