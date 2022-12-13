import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";

const Form = styled.div`
  display: flex;
  flex-direction: row;



  label {
    font-weight: bold;
  }
`;
const Section = styled.div`
  &:nth-child(1) {
    width: 160px;
    padding-right: 10px;
  }

  &:nth-child(2) {
    width: 274px;
    padding-right: 10px;
  }
  label {
    display: flex;
    flex-direction: row;
    white-space: nowrap;

    &:nth-child(1) {
      padding-top: 11px;
    }
    &:nth-child(2) {
      padding-top: 74px;
    }
    &:nth-child(3) {
      padding-top: 65px;
    }
  }
`;
const Input = styled.input`
  font-family: "Exo";
  width: 270px;
  height: 40px;
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  background-color: #e5e5e5;
  border: 2px solid #e5e5e5;
  border-radius: 0.375rem;
  box-shadow: 0.3s ease-in-out;
  text-align: left;
  text-indent: 5px;
  outline: none !important;
  margin-bottom: 5px;
`;
const Button = styled.button`
  margin-bottom: 5px;
  width: 274px;
  height: 40px;
  background-color: #d2d2d2;
  color: #000;
  border: #d2d2d2;
  padding: 5px;
  font-size: 1rem;
  border-radius: 0.375rem;
  cursor: pointer;

  :active {
    opacity: 90%;
  }

  :disabled {
    opacity: 50%;
    cursor: default;
  }
`;

const CartSettings = () => {
  const [shopData, setShopData] = useState();

  const [couponCode, setCouponCode] = useState();
  const [tax, setTax] = useState();

  const [shippingCost, setShippingCost] = useState();
  const [shippingMethod, setShippingMethod] = useState();

  useEffect(() => {
    if (!shopData) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/shop`).then((response) => {
        setShopData(response.data);
      });
    }
  }, [!shopData]);

  const couponCodeHandler = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/shop/6385b7040889fecc72bff33c`, {
      method: "PATCH",
      body: JSON.stringify({ couponCode: couponCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Coupon Code Changed.", { position: "top-right" });
    setCouponCode("");
    setShopData("");
  };

  const taxHandler = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/shop/6385b7040889fecc72bff33c`, {
      method: "PATCH",
      body: JSON.stringify({ tax: tax }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Tax Changed.", { position: "top-right" });
    setTax("");
    setShopData("");
  };

  const shippingCostHandler = async (event) => {
    event.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/shop/6385b7040889fecc72bff33c`, {
      method: "PATCH",
      body: JSON.stringify({
        shippingCost: [shippingCost.split(",")[0], shippingCost.split(",")[1], shippingCost.split(",")[2], shippingCost.split(",")[3], shippingCost.split(",")[4], shippingCost.split(",")[5]],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Shipping Cost Changed.", { position: "top-right" });
    setShippingCost("");
    setShopData("");
  };

  const shippingMethodHandler = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/shop/6385b7040889fecc72bff33c`, {
      method: "PATCH",
      body: JSON.stringify({
        shippingMethod: [
          shippingMethod.split(",")[0],
          shippingMethod.split(",")[1],
          shippingMethod.split(",")[2],
          shippingMethod.split(",")[3],
          shippingMethod.split(",")[4],
          shippingMethod.split(",")[5],
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Shipping Method Changed.", { position: "top-right" });
    setShippingMethod("");
    setShopData("");
  };

  return (
    <>

    <Head>
    <title>Dashboard | Checkout</title>
  </Head>

    <Form>
      <Section>
        <label htmlFor="tax">Tax: <p>{!shopData && <Loader />}</p></label>
        <label htmlFor="couponCode">Coupan Code: <p>{!shopData && <Loader />}</p></label>
        <label htmlFor="shippingData">Shipping Data:</label>
      </Section>

      <Section>
        <Input type="text" id="tax" name="tax" value={tax} placeholder={shopData && `$${shopData[0].tax}`} onChange={(event) => setTax(event.target.value)} />
        <Button onClick={taxHandler} disabled={!tax && true}>Change Tax</Button>
        <Input type="text" id="couponCode" name="couponCode" value={couponCode} placeholder={shopData && shopData[0].couponCode} onChange={(event) => setCouponCode(event.target.value)} />
        <Button onClick={couponCodeHandler} disabled={!couponCode && true}>Change Coupon Code</Button>

        <table>
          <th>{shopData ? shopData[0].shippingMethod.map((item, index) => <tr key={index}>{item && item}</tr>) : <Loader />}
            <tr>
              <Input type="text" name="shippingMethod" value={shippingMethod} placeholder="FlashBox, Tipox, ..." onChange={(event) => setShippingMethod(event.target.value)} />
              <Button onClick={shippingMethodHandler} disabled={!shippingMethod && true}>Change Shipping Methods</Button>
            </tr>
          </th>

          <td>
            {shopData ? shopData[0].shippingCost.map((item, index) => <tr key={index}>{item && `$${item}`}</tr>) : <Loader />}
            <tr>
              <Input type="text" name="shippingCost" value={shippingCost} placeholder="$2, $3, ..." onChange={(event) => setShippingCost(event.target.value)} />
              <Button onClick={shippingCostHandler} disabled={!shippingCost && true}>Change Shipping Costs</Button>
            </tr>
          </td>
        </table>
      </Section>

        <Toaster />

    </Form>
    </>

  );
};

export default CartSettings;
