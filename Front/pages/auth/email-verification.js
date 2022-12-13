import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/auth/userAction";
import styles from "./auth.module.css";
import useTitle from "../../hooks/useTitle";


const EmailVerification = () => {

useTitle("Email Verification")


  const success = useRef();

  const router = useRouter()

  const dispatch = useDispatch();


  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if(router.isReady) {
      if (!router.query.email) {
        router.push("/auth/login-with-password")
    }
    }
  }, [router.query.email]);




      if (router.query.email) {
        
              axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
                const user = response.data.find((user) => user.email === router.query.email);
          
                if (user) {
                  if (user.emailVerified) {      
                    setLoading(false)
                    success.current.textContent = "Your Email Address is Verified.";
            
                  } else {
                      fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${user._id}`, {
                      method: "PATCH",
                      body: JSON.stringify({emailVerified: true}),
                      headers: {"Content-Type": "application/json"}
                    })
                    setLoading(false)
                      success.current.textContent = "Your Email Address Has Been Verified. You Can Now Login To Your Account.";
                      dispatch(logoutSuccess());
                  }
                } else {
                  router.push("/auth/login-with-password")
                }
              })

      }
    






  return (
    <>
          <div className={styles.Msgcontainer}>

      <div className={styles.emailVerification}>
        <h2 className={styles.success} ref={success}>{loading && "Verifying..."}</h2>
        
      </div>
      </div>

    </>
  );
};

export default EmailVerification;
