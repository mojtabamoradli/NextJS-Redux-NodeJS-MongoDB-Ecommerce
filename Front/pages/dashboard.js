import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = dynamic(() => import("../components/dashboard/Layout"), { ssr: false });

const dashboard = () => {
  const router = useRouter();

  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login-with-password");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Layout />
    </>
  );
};

export default dashboard;
