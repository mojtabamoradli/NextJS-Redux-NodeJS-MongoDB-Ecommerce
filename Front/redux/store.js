import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { getPersistConfig } from "redux-deep-persist";

// const persistConfig = {
//   key: "main-root",
//   storage,

// };

const persistConfig = getPersistConfig({
  key: "root",
  storage,
  blacklist: [
    "user.isLoggedIn.password",
    "user.isLoggedIn.userPrivateKey",
    "user.isLoggedIn.phone",
    "user.isLoggedIn.userPublicKey",
    "user.isLoggedIn.address",
    "user.isLoggedIn.zipCode",
    "user.isLoggedIn.TFASecret",
    "user.isLoggedIn.TFAQR",
    "user.user.password",
    "user.user.userPrivateKey",
    "user.user.userPublicKey",
    "user.user.phone",
    "user.user.address",
    "user.user.zipCode",
    "user.user.TFASecret",
    "user.user.TFAQR",
  ],
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

const Persistor = persistStore(store);

export { Persistor };

export default store;
