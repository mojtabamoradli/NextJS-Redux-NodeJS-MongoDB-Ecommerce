import styles from "./auth.module.css";
import React, { useState, useRef, useEffect } from "react";
import { authentication } from "../../functions/authFormValidation";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import bcrypt from "bcryptjs";
import useTitle from "../../hooks/useTitle";
import axios from "axios";

const ResetPassword = () => {
  useTitle("Reset Password");

  const success = useRef();
  const failed = useRef();

  const router = useRouter();

  const dispatch = useDispatch();

  const [input, setInput] = useState({ password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.email) {
        router.push("/auth/login");
      }
    }
  }, [router.query.email]);

  useEffect(() => {
    setErrors(authentication(input, "RESET_PASSWORD"));
  }, [input, touched]);

  const changeHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!errors.password && input.password != "") {
      setLoading(true);

      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
        const user = response.data.find((user) => user.email === router.query.email);

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${user._id}`, {
          method: "PATCH",
          body: JSON.stringify({ password: bcrypt.hashSync(input.password, bcrypt.genSaltSync(10)) }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        failed.current.textContent = "";
        success.current.textContent = "Password Updated! You Can Now Login With Your New Password.";

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
          from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
          text: `<p style="font-size: 15px">Your Password for ${input.email} changed at ${new Date().toLocaleDateString("fa-IR-u-nu-latn", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}, ${new Date().toString().substring(15, 21)}</br> If you believe this reset is suspicious, please contact: contact@mojtabamoradli.ir</p>`,
          to: user.email,
          subject: `Successful Password Reset`,
        });
        setLoading(false);
      });
    } else {
      setTouched({ password: true });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.accountsTitle}>Reset Password</h2>
        <form onSubmit={submitHandler}>
          <div>
            <p className={styles.formControlHead}>New Password:</p>
            <input className={styles.formControl} type="password" name="password" value={input.password} onChange={changeHandler} onFocus={focusHandler} />
            <p className={styles.errors}>{errors.password && touched.password && errors.password}</p>
          </div>

          <button className={loading ? styles.btnLoading : styles.btn} type="submit">
            {loading ? "Reseting Password..." : "Reset Password"}
          </button>
        </form>
        <div className={styles.messageError}>
          <span className={styles.failed} ref={failed}></span>
          <span className={styles.success} ref={success}></span>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
