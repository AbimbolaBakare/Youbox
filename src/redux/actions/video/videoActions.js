import { appConstants } from "../actionTypes";

export function fetchOneVideoAction(payload) {
    return {
      type: appConstants.FETCH_ONE_VIDEO,
      payload,
    };
}

export function fetchUserVideoAction(payload) {
  return {
    type: appConstants.FETCH_USER_VIDEO,
    payload,
  };
}