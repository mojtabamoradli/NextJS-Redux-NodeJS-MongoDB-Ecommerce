import styles from "./auth.module.css";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { authentication } from "../../functions/authFormValidation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/auth/userAction";
import axios from "axios";
import useTitle from "../../hooks/useTitle";
import GoogleOAuth from "./google-oauth";

const OTPLogin = () => {
  useTitle("Log in with OTP");

  const success = useRef();
  const failed = useRef();

  const router = useRouter();

  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [input, setInput] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setErrors(authentication(input, "LOGIN_WITH_OTP"));
  }, [input, touched]);

  const changeHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!Object.keys(errors).length) {
      setLoading(true);

      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
        const user = response.data.find((user) => user.email === input.email);
        if (user && user.email === input.email) {
          if (user.emailVerified) {
            if (user.status === "allowed") {
              window.localStorage.setItem("OTPkey", Math.floor(Math.random() * 10 ** 21).toString(36));
              window.localStorage.setItem("OTPkeyExpireTime", new Date().getTime());

              axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
                from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
                text: `<p style="font-size: 15px">Click to Login to Your Account</br><a href='${process.env.NEXT_PUBLIC_BASE_URL}/auth/login-with-otp?email=${
                  input.email
                }&OTPkey=${window.localStorage.getItem("OTPkey")}'>Login</a></p>`,
                to: input.email,
                subject: `OTP Login`,
              });

              success.current.textContent = `Please Check Your Email to Login to Your Account.`;
              failed.current.textContent = "";
              setLoading(false);
            } else {
              success.current.textContent = "";
              failed.current.textContent = "Access Denied! Please Contact: contact@mojtabamoradli.ir";
              setLoading(false);
            }
          } else {
            dispatch(loginFailure());
            success.current.textContent = "";
            failed.current.textContent = "Please Check Your Email to Verify Your Account.";
            setLoading(false);

            if (input.email) {
              axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
                from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
                text: `<p style="font-size: 15px">Click to Verify Your Email Address</br><a href='${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verification?email=${input.email}'>Verify My Email Address</p>`,
                to: input.email,
                subject: `Email Verification`,
              });
            }
          }
        } else {
          success.current.textContent = "";
          failed.current.textContent = "Wrong Email!";
          setLoading(false);
        }
      });
    } else {
      setTouched({ email: true });
    }
  };

  useEffect(() => {
    if (router.query.email) {
      if (typeof window !== "undefined") {
        if (router.query.OTPkey === window.localStorage.getItem("OTPkey")) {
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
            const user = response.data.find((user) => user.email === router.query.email);
            dispatch(loginSuccess(user));
            window.localStorage.setItem("LoginTime", new Date().getTime());
            success.current.textContent = "Login Successful.";
            failed.current.textContent = "";

            if (user.email) {
              axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
                from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
                text: `<p style="font-size: 15px">We're verifying a recent log in for ${user.email} at ${new Date().toLocaleDateString("fa-IR-u-nu-latn", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}, ${new Date().toString().substring(15, 21)}</br> If you believe that this log in is suspicious, please contact: contact@mojtabamoradli.ir</p>`,
                to: user.email,
                subject: `Successful log in for ${user.email}`,
              });
            }
          });
        } else {
          success.current.textContent = "";
          failed.current.textContent = "OTP Expired!";
        }
      }
    }
  }, [dispatch, router.query.email]);

  return (
    <div className={styles.container}>
      <h2 className={styles.accountsTitle}>Log with OTP</h2>
      <div className={styles.accountsHelp}>
        <p>We'll email you a magic link</p>
        <p>for a password-free sign in.</p>
      </div>
      <form onSubmit={submitHandler}>
        <div>
          <p className={styles.formControlHead}>Email address:</p>
          <input className={styles.formControl} type="email" name="email" value={input.email} onChange={changeHandler} onFocus={focusHandler} />
          <p className={styles.errors}>{errors.email && touched.email && errors.email}</p>
        </div>

        <button className={loading ? styles.btnLoading : styles.btn} type="submit">
          {loading ? "Sending link..." : "Send link"}
        </button>
      </form>
      <div className={styles.messageError}>
        <span className={styles.success} ref={success}></span>
        <span className={styles.failed} ref={failed}></span>
      </div>
      <div className={styles.loginWith}>
        <span>Log in with </span>
        <Link className={styles.a} href="/auth/login-with-password">
          Password
        </Link>
        {" / "}
        <Link className={styles.a} href="/auth/login-with-sms">
          SMS
        </Link>
      </div>
      <GoogleOAuth />
      <div className={styles.dontHaveAnAccount}>
        <span>Don't Have an Account? </span>
        <Link className={styles.a} href="/auth/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default OTPLogin;
