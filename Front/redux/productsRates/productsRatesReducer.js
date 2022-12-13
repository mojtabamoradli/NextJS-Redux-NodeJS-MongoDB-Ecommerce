const initialState = {
  productsRates: [],
};

const productsRatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTSRATES_SUCCESS":
      return {
        ...state,
        productsRates: action.payload,
      };
      default:
      return state
  }
};

export default productsRatesReducer;
