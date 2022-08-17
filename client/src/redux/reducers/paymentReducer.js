const initialState = {
  list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_PAYMENTS":
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
}
