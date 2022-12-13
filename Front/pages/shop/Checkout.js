import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Link from "next/link";

import Head from "next/head";

import dynamic from "next/dynamic";

const Cart = dynamic(() => import("./Cart"), { ssr: false });
const Receipt = dynamic(() => import("./Receipt"), { ssr: false });

import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 50px 175px 50px;
  transition: all 0.2s ease;
  gap: 20px;

  @media (max-width: 1200px) {
    margin: 120px 80px 50px;
  
}

@media (max-width: 1050px) {
    flex-direction: column-reverse;
    margin: 120px 80px 50px;
    align-items: center;
  }
  @media (max-width: 768px) {
    margin: 120px 40px 50px;
  
}

@media (max-width: 555px) {
    margin: 120px 20px 50px;
  
}

`

const CartContainer = styled.div`
width: 70%;

@media (max-width: 1050px) {
 
    width: 100%;
}
  

`




const ShopCart = () => {

  const router = useRouter()

  const state = useSelector((state) => state.cartState);



  return (
    <>

      <Head>
        <title>Cart</title>
      </Head>


      <Container>



        <CartContainer>{state.selectedItems.map((item) => (<Cart key={item.id} data={item} />))}</CartContainer>
        <Receipt state={state}/>

      </Container>








      <Toaster />


    </>
  );
};

export default ShopCart;
