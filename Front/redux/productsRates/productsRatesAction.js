import axios from "axios";

const fetchProductsRatesSuccess = (productsRates) => {
  return {
    type: "FETCH_PRODUCTSRATES_SUCCESS",
    payload: productsRates,
  };
};

export { fetchProductsRatesSuccess };

export const fetchProductsRates = () => {
  return (dispatch) => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/product_rate`).then((response) => {
      dispatch(fetchProductsRatesSuccess(response.data));
    });
  };
};
