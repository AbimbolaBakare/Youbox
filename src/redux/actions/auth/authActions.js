import { appConstants } from "../actionTypes";

export function signInAction(payload) {
    return {
      type: appConstants.SIGN_IN_WITH_GOOGLE,
      payload,
    };
}