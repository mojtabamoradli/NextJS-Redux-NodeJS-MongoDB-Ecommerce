import "../styles/globals.css";
import Layout from "../components/layout/Layout";

import { Provider } from "react-redux";
import store from "../redux/store";
import Head from "next/head";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }) {
  if (typeof window !== "undefined" && new Date().getTime() > Number(Number(window.localStorage.getItem("OTPkeyExpireTime")) + Number(120000))) {
    // 2 minutes
    window.localStorage.removeItem("OTPkeyExpireTime");
    window.localStorage.removeItem("OTPkey");
  }

  if (typeof window !== "undefined" && new Date().getTime() > Number(Number(window.localStorage.getItem("SMSkeyExpireTime")) + Number(120000))) {
    // 2 minutes
    window.localStorage.removeItem("SMSkeyExpireTime");
    window.localStorage.removeItem("SMSkey");
  }

  if (typeof window !== "undefined" && new Date().getTime() > Number(Number(window.localStorage.getItem("PasswordResetExpireTime")) + Number(120000))) {
    // 2 minutes
    window.localStorage.removeItem("PasswordResetExpireTime");
    window.localStorage.removeItem("PasswordResetkey");
  }

  if (typeof window !== "undefined" && new Date().getTime() > Number(Number(window.localStorage.getItem("LoginTime")) + Number(18000000))) {
    // 5 hours
    window.localStorage.removeItem("persist:root");
    window.localStorage.removeItem("LoginTime");
  }

  // if(typeof window !== "undefined") {
  //   if (JSON.parse(JSON.parse(window.localStorage.getItem("persist:main-root")).user).isLoggedIn)
  //   JSON.parse(JSON.parse(window.localStorage.getItem("persist:main-root")).user).users ===""

  // }
  // if(typeof window !== "undefined") {

  // console.log(JSON.parse(JSON.parse(window.localStorage.getItem("persist:main-root")).user).isLoggedIn)
  // console.log(JSON.parse(JSON.parse(window.localStorage.getItem("persist:main-root")).user).users)
  // }

  return (
    <Elements stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ApolloProvider>
    </Elements>
  );
}

export default App;
