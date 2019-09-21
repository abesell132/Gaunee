const initialState = {
  properties: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case GET_PROPERTIES:
    //   return {
    //     ...state,
    //     properties: action.payload
    //   };

    default:
      return state;
  }
}
