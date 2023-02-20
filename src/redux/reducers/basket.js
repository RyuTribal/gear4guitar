import { BASKET_SET, BASKET_REMOVE, BASKET_GET } from "../actions/basket";

const basketReducer = (state = 0, action) => {
  switch (action.type) {
    case BASKET_SET:
      return { ...state, basket: [...action.value] };
    case BASKET_REMOVE:
      return { ...state, basket: [] };
    case BASKET_GET:
      return { ...state };
    default:
      return { ...state };
  }
};

export default basketReducer;
