import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
  text-align: center;
  margin: 150px auto 150px auto;
`;

export default function Custom404() {
  const router = useRouter()


  useEffect(() => {
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }, [])

  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <Div>
        <h1>Page Not Found</h1>
        <h2>Error 404</h2>
      </Div>
    </>
  );
}
