import { JWT_ADD, JWT_REMOVE, JWT_GET } from "../actions/jwt";

const jwtReducer = (state = 0, action) => {
  switch (action.type) {
    case JWT_ADD:
      return { ...state, jwt_token: action.value };
    case JWT_REMOVE:
      return { ...state, jwt_token: null };
    case JWT_GET:
      return { ...state };
    default:
      return { ...state };
  }
};

export default jwtReducer;
