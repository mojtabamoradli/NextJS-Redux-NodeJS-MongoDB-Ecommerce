import React, { useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/auth/userAction";
import axios from "axios";
import styled from "styled-components";

const GoogleButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;

  @media (max-width: 768px) {
    width: 280px;
  }

  @media (max-width: 400px) {
    width: 260px;
  }
`;

const GoogleOAuth = () => {
  const dispatch = useDispatch();

  const GoogleBTN = useRef();

  const handleCallbackResponse = (response) => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((res) => {
      const GoogleUser = res.data.find((user) => user.email === jwt_decode(response.credential).email);

      if (!GoogleUser) {
        //signup
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/signup/google`, {
          method: "POST",
          body: JSON.stringify({ fullName: jwt_decode(response.credential).name, email: jwt_decode(response.credential).email }),
          headers: { "Content-Type": "application/json" },
        });

        //login
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((res) => {
          const GoogleUser = res.data.find((user) => user.email === jwt_decode(response.credential).email);

          dispatch(loginSuccess(GoogleUser));
          window.localStorage.setItem("LoginTime", new Date().getTime());

          if (GoogleUser.email) {
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
              from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
              text: `<p style="font-size: 15px">We're verifying a recent passwordless log in via Google for ${jwt_decode(response.credential).email} at ${new Date().toLocaleDateString(
                "fa-IR-u-nu-latn",
                { year: "numeric", month: "2-digit", day: "2-digit" }
              )}, ${new Date().toString().substring(15, 21)}</br> If you believe that this log in is suspicious, please contact: contact@mojtabamoradli.ir</p>`,
              to: GoogleUser.email,
              subject: `Successful log in for ${GoogleUser.email}`,
            });
          }
        });
      }
      if (GoogleUser) {
        dispatch(loginSuccess(GoogleUser));
        window.localStorage.setItem("LoginTime", new Date().getTime());

        if (GoogleUser.email) {
          axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
            from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
            text: `<p style="font-size: 15px">We're verifying a recent passwordless log in via Google for ${GoogleUser.email} at ${new Date().toLocaleDateString("fa-IR-u-nu-latn", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}, ${new Date().toString().substring(15, 21)}; If you believe that this log in is suspicious, please contact: contact@mojtabamoradli.ir</p>`,
            to: GoogleUser.email,
            subject: `Successful log in for ${GoogleUser.email}`,
          });
        }
      }
    });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(GoogleBTN.current, { theme: "filled_white", size: "medium", shape: "rectangular", type: "standard", text: "continue_with" });
  }, []);

  return <GoogleButton ref={GoogleBTN}></GoogleButton>;
};

export default GoogleOAuth;
