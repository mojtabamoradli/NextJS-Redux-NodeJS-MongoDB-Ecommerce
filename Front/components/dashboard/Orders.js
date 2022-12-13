import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../Loader";
import styled from "styled-components";
import CryptoJS from "crypto-js"
import Head from "next/head";


const Nav = styled.div`
ul {
  display: flex;
  gap: 20px;
  margin-top: 15px;
  align-items: center;
  justify-items: center;
  justify-content: center;
  text-align: center;
  list-style: none;
  
}
`;
const Label = styled.div`


position: relative;
  font-size: 0.9rem;
  font-weight: bold;
color: #4e0e2e;
cursor: pointer;

`
const Icon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  -webkit-filter: grayscale(100%); 
  filter: grayscale(90%);
`
const Order = styled.div`
  /* width: 500px; */
  /* margin: 0 100px 0 100px; */
  justify-content: center;
  align-items: center;
  align-items: center;
  align-self: center;


    /* font-size: 20px; */




`;
const OrderWrapper = styled.div`
    background-color: #d2d2d2;
    color: black;
    padding: 10px;
    border-radius: 0.375rem;
    margin: 10px;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    @media (max-width: 465px) {
      font-size: 15px;

    }

    @media (max-width: 385px) {
      font-size: 12px;

    }
`
const OrderDateTime = styled.span`
    color: black;
    float: right;
    `
const Button = styled.button`
  /* margin-bottom: 5px; */
  /* height: 40px; */
  width: fit-content;
  background-color: #4e0e2e;
  color: #fff;
  border: #4e0e2e;
  padding: 3px;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 14px;
font-weight: bold;





  @media (max-width: 465px) {
      font-size: 10px;

    }
  :active {
    opacity: 90%;
  }

  :disabled {
    opacity: 50%;
    cursor: default;
  }
`;

const Orders = () => {

  const [orders, setOrders] = useState();

  const [pending, setPending] = useState(true);
  const [prepared, setPrepared] = useState(false);
  const [sent, setSent] = useState(false);
  const [canceled, setCanceled] = useState(false);


  useEffect(() => {
    if (!orders) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders`).then((response) => {
        setOrders(response.data);
      });
    }
  }, [!orders]);


  const preparedHandler = (props) => {
    const RightOrder = orders.find((i) => i._id === props);
    if (RightOrder) {

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders/${RightOrder._id}`, {
            method: "PATCH",
            body: JSON.stringify({ prepared: true }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
            from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
            text: `Your Order Is on the Way. ${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
            to: RightOrder.email,
            subject: "Order Status",
          });
          setOrders("")

    }


  };

  const sendHandler = (props) => {
    const RightOrder = orders.find((i) => i._id === props);
    if (RightOrder) {

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders/${RightOrder._id}`, {
            method: "PATCH",
            body: JSON.stringify({ sent: true }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
            from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
            text: `Your Order Is on the Way. ${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
            to: RightOrder.email,
            subject: "Order Status",
          });
          setOrders("")

    }



    
  };



  return (
    <>
      <Head>
      <title>Dashboard | Orders</title>
    </Head>

<Nav>
        <ul>
            <li className={pending ? "on" : ""} onClick={() => setPending(current => !current, setPrepared(false), setSent(false), setCanceled(false))}><Icon><b>💁🏻‍♂️</b></Icon><Label>Pending</Label></li>
            <li className={prepared ? "on" : ""} onClick={() => setPrepared(current => !current, setPending(false), setSent(false), setCanceled(false))}><Icon><b>🕺🏻</b></Icon><Label>Prepared</Label></li>
            <li className={sent ? "on" : ""} onClick={() => setSent(current => !current, setPending(false), setPrepared(false), setCanceled(false))}><Icon><b>🏃🏻‍♂️</b></Icon><Label>Sent </Label></li>
            <li className={canceled ? "on" : ""} onClick={() => setCanceled(current => !current, setPending(false), setPrepared(false), setSent(false))}><Icon><b>🙅🏻‍♂️</b></Icon><Label>Canceled</Label></li>
        </ul>
      </Nav>

      <p>{!orders && <Loader />}</p>


{pending &&

      <Order>
        {orders && orders.map((item, index) => item.paid && !item.prepared && !item.sent && (
                
                  <OrderWrapper key={index}>
                  <p>🆔 {item._id} <Button onClick={() => {preparedHandler(item._id);}}>Prepared</Button><OrderDateTime>📅 {item.date} 🕐 {item.time}</OrderDateTime></p>
                    <p>🛻 {item.customer}, {(CryptoJS.AES.decrypt(item.address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)}, {(CryptoJS.AES.decrypt(item.zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)}, {item.phone}</p>
                    <p><p>💰 ${Number(item.total)} (including tax and shipping costs)</p> <b>{item.basket.map((item, index) => (<p key={index}>📦 {item}</p>))}</b></p>
                </OrderWrapper>
              )
       )}
      </Order>
}

{prepared && 

      <Order>
        {orders && orders.map((item, index) => item.prepared && !item.sent && (
                
                <OrderWrapper key={index}>
                  <p>🆔 {item._id} <Button onClick={() => {sendHandler(item._id);}}>Sent</Button><OrderDateTime>📅 {item.date} 🕐 {item.time}</OrderDateTime></p>
                    <p>🛻 {item.customer}, {(CryptoJS.AES.decrypt(item.address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)}, {(CryptoJS.AES.decrypt(item.zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)}, {item.phone}</p>
                    <p><p>💰 ${Number(item.total)} (including tax and shipping costs)</p> <b>{item.basket.map((item, index) => (<p key={index}>📦 {item}</p>))}</b></p>
                </OrderWrapper>
              )
          ) }
      </Order>
}

{sent &&

      <Order>
        {orders && orders.map((item, index) => item.prepared && item.sent && (
                  
                  <OrderWrapper key={index}>
                  <p>🆔 {item._id} <OrderDateTime>📅 {item.date} 🕐 {item.time}</OrderDateTime></p>
                    <p>🛻 {item.customer}, {(CryptoJS.AES.decrypt(item.address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)}, {(CryptoJS.AES.decrypt(item.zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)}, {item.phone}</p>
                    <p><p>💰 ${Number(item.total)} (including tax and shipping costs)</p> <b>{item.basket.map((item, index) => (<p key={index}>📦 {item}</p>))}</b></p>
                </OrderWrapper>
              )
          ) }
      </Order>
}
{canceled &&

      <Order>
        {orders &&
          orders.map(
              (item, index) => !item.paid && (
                
                <OrderWrapper key={index}>
                  <p>🆔 {item._id} <OrderDateTime>📅 {item.date} 🕐 {item.time}</OrderDateTime></p>
                    <p>🛻 {item.customer}, {(CryptoJS.AES.decrypt(item.address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)}, {(CryptoJS.AES.decrypt(item.zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)}, {item.phone}</p>
                    <p><p>💰 ${Number(item.total)} (including tax and shipping costs)</p> <b>{item.basket.map((item, index) => (<p key={index}>📦 {item}</p>))}</b></p>
                </OrderWrapper>
              )
          ) }
      </Order>
}

    </>
  );
};

export default Orders;
