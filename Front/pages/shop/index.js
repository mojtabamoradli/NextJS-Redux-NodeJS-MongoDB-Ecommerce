import dynamic from "next/dynamic";
import Head from "next/head";
import ProductSearcch from "./ProductSearcch";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";

const Products = dynamic(() => import("./Products"), { ssr: false });

const Breadcrumbs = styled.div`
ul {
display: flex;
gap: 10px;
margin-top: 40px;
margin-bottom: 10px;
align-items: center;
justify-items: center;
justify-content: center;
text-align: center;
list-style: none;
}
`

const Shop = () => {

  const router = useRouter();


  return (
    <>

      <Head>
        <title>Shop</title>
      </Head>

      <Breadcrumbs>
    <ul>
      <li><Link href="/">Home</Link></li>
      {"≻"}
      <li className={router.pathname == "/shop" ? "active" : ""}><Link href="/shop">Shop</Link></li>
    </ul>
  </Breadcrumbs>

      <ProductSearcch />
    <Products /> 


    </>
  );
};

export default Shop;
