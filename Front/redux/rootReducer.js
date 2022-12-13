import { combineReducers } from "redux";
import { userReducer } from "./auth/userReducer";
import productsReducer from "./products/productsReducer";
import productsRatesReducer from "./productsRates/productsRatesReducer";
import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
  user: userReducer,
  productsState: productsReducer,
  productsRatesState: productsRatesReducer,
  cartState: cartReducer,
});

export default rootReducer;
