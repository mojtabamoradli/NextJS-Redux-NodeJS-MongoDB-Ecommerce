import axios from 'axios';
import moment from 'jalali-moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from "../Loader";
import styled from "styled-components";
import Head from 'next/head';


const Order = styled.div`

  justify-content: center;
  align-items: center;
  align-items: center;
  align-self: center;


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

const MyOrders = () => {

    const { isLoggedIn } = useSelector((state) => state.user);

    const [orders, setOrders] = useState()


    
    useEffect(() => {
        if (!orders && isLoggedIn) {
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders`).then((response) => {
            const order = response.data.filter((order) => order.email === isLoggedIn.email);
            setOrders(order);
          });
        }
      }, [!orders]);




    return (
      <>
      <Head>
      <title>Dashboard | My Orders</title>
    </Head>
        <Order>
          {orders ? (
            <div>
              {orders.map((item, index) => (
                <OrderWrapper key={index}>
                  {/* The last update of order data is when i change its status to sent, so the last time is updates will be when its been shipped out */}
                  
                  <p>🆔 {item._id}<OrderDateTime>📅 {item.date} 🕐 {item.time}</OrderDateTime></p>
                    <p><p>💰 ${Number(item.total)} (including tax and shipping costs)</p> <b>{item.basket.map((item, index) => (<p key={index}>📦 {item}</p>))}</b></p>
                  <p ><b>🛻 </b>{item.paid ? "Paid" : "canceled because of failed payment."} {item.prepared &&  "& Prepared"} {item.sent && ` & Sent (${moment(item.updatedAt.substring(0, 10).replaceAll("-", "/")).locale("fa").format("YYYY/MM/DD")})`}</p>
                </OrderWrapper>
                
              ))}
            </div>
          ) : <Loader />}
        </Order>
              </>

    );
};

export default MyOrders;