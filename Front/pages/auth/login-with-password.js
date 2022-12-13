import styles from "./auth.module.css";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { authentication } from "../../functions/authFormValidation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/auth/userAction";
import axios from "axios";
import bcrypt from "bcryptjs";
import useTitle from "../../hooks/useTitle";
import GoogleOAuth from "./google-oauth";
import ReCAPTCHA from "react-google-recaptcha";
import speakeasy from "speakeasy";
import CryptoJS from "crypto-js"

const PasswordLogin = () => {
  useTitle("Log in");

  const success = useRef();
  const failed = useRef();

  const router = useRouter();

  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const [reCAPTCHA, setReCAPTCHA] = useState();
  const [TFAToken, setTFAToken] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setErrors(authentication(input, "LOGIN"));
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
      if (reCAPTCHA) {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
          const user = response.data.find((user) => bcrypt.compareSync(input.password, user.password) && user.email === input.email);

          if (user && user.TFA) {
            if (user.TFAToken !== "") {
              var verified = speakeasy.totp.verify({ secret: (CryptoJS.AES.decrypt(user.TFASecret, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8), encoding: "ascii", token: TFAToken });
              if (verified) {
                if (user && user.email === input.email) {
                  if (user.emailVerified) {
                    if (user.status === "allowed") {
                      dispatch(loginSuccess(user));
                      setLoading(false);
                      window.localStorage.setItem("LoginTime", new Date().getTime());
                      success.current.textContent = "Login Successful.";
                      failed.current.textContent = "";

                      if (input.email) {
                        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
                          from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
                          text: `<p style="font-size: 15px">We're verifying a recent log in for ${input.email} at ${new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})}, ${new Date().toString().substring(15, 21)}</br> If you believe that this log in is suspicious, please contact: contact@mojtabamoradli.ir</p>`,
                          to: input.email,
                          subject: `Successful log in for ${input.email}`,
                        });
                      }
                    } else {
                      success.current.textContent = "";
                      failed.current.textContent = "Access Denied! Please Contact: contact@mojtabamoradli.ir";
                      setLoading(false);
                    }
                  } else {
                    success.current.textContent = "";
                    failed.current.textContent = "Please Check Your Email to Verify Your Account.";
                    dispatch(loginFailure());
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
                  failed.current.textContent = "Wrong Email or Password!";
                  setLoading(false);
                }
              } else {
                success.current.textContent = "";
                failed.current.textContent = "2FA Code Invalid!";
                setLoading(false);
              }
            }
          } else {
            if (user && user.email === input.email) {
              if (user.emailVerified) {
                if (user.status === "allowed") {
                  dispatch(loginSuccess(user));
                  setLoading(false);
                  window.localStorage.setItem("LoginTime", new Date().getTime());
                  success.current.textContent = "Login Successful.";
                  failed.current.textContent = "";

                  if (input.email) {
                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
                      from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
                      text: `<p style="font-size: 15px">We're verifying a recent log in for ${input.email} at ${new Date().toLocaleDateString("fa-IR-u-nu-latn", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}, ${new Date().toString().substring(15, 21)}</br> If you believe that this log in is suspicious, please contact: contact@mojtabamoradli.ir</p>`,
                      to: input.email,
                      subject: `Successful log in for ${input.email}`,
                    });
                  }
                } else {
                  success.current.textContent = "";
                  failed.current.textContent = "Access Denied! Please Contact: contact@mojtabamoradli.ir";
                  setLoading(false);
                }
              } else {
                success.current.textContent = "";
                failed.current.textContent = "Please Check Your Email to Verify Your Account.";
                dispatch(loginFailure());
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
              failed.current.textContent = "Wrong Email or Password!";
              setLoading(false);
            }
          }
        });
      } else {
        success.current.textContent = "";
        failed.current.textContent = "Please Confirm CAPTCHA!";
        setLoading(false);
      }
    } else {
      setTouched({ email: true, password: true });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.accountsTitle}>Log in to your account</h2>
      <form onSubmit={submitHandler}>
        <div>
          <p className={styles.formControlHead}>Email address:</p>
          <input className={styles.formControl} type="email" name="email" value={input.email} onChange={changeHandler} onFocus={focusHandler} />
          <p className={styles.errors}>{errors.email && touched.email && errors.email}</p>
        </div>
        <div>
          <p className={styles.formControlHead}>Password:</p>
          <input className={styles.formControl} type="password" name="password" value={input.password} onChange={changeHandler} onFocus={focusHandler} />
          <p className={styles.errors}>{errors.password && touched.password && errors.password}</p>
        </div>

        <div className={styles.RECAPTCHA}>
          <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY} onChange={(event) => setReCAPTCHA(event)} size="normal" />
        </div>
        <div>
          <p className={styles.formControlHead}>2FA is Enabled? Enter Code:</p>
          <input className={styles.formControl} type="text" name="TFAToken" value={TFAToken} onChange={(event) => setTFAToken(event.target.value)} />
        </div>
        <button className={loading ? styles.btnLoading : styles.btn} type="submit">
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className={styles.messageError}>
        <span className={styles.failed} ref={failed}></span>
        <span className={styles.success} ref={success}></span>
      </div>

      <div className={styles.forgotPassword}>
        <Link className={styles.a} href="/auth/forgot-password">
          Forgot Password
        </Link>
      </div>
      <div className={styles.loginWith}>
        <span>Log in with </span>
        <Link className={styles.a} href="/auth/login-with-otp">
          OTP
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

export default PasswordLogin;
