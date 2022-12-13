import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";

import styled from 'styled-components';
import { clear } from "../../redux/cart/cartAction";
import { useEffect, useState } from "react";
import axios from "axios";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CryptoJS from "crypto-js"

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

const Input = styled.input`
  font-family: "Exo";
  width: 215px;
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
const Textarea = styled.textarea`
  font-family: "Exo";
  width: 215px;
  height: 80px !important;
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  background-color: #e5e5e5;
  border: 2px solid #e5e5e5;
  border-radius: 0.375rem;
  box-shadow: 0.3s ease-in-out;
  text-align: left;
  text-indent: 5px;
  resize: none;

  height: 100px;

  :focus {
    outline: none !important;
  }
`;

const Select = styled.select`
  font-family: "Exo";
  width: 220px;
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

const ReceiptBox = styled.div`
  width: 27%;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: left;

  @media (max-width: 1050px) {
 
    width: 100%;
    margin-bottom: 20px;
  }

`

const ReceiptContainer = styled.div`
  margin: 20px 20px 10px;
  p{
    margin-top: 5px;
  }
  

`


const PayButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0px 20px 10px;
  gap: 20px;

  a {
    margin: 0px auto 30px auto;
    background: #4e0e2e;
    padding: 10px;
    width: 100%;
    border-radius: 0.375rem;
    color: #fff;
    align-items: center;
justify-items: center;
justify-content: center;
text-align: center;

}
`

const Stripe = styled.form`
  margin: 0px 25px 0;

  button {
    margin: 20px;

  }
`
const Complete = styled.div`

`

const Receipt = ({state}) => {


    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector((state) => state.user);

    const [paying, setPaying] = useState(false);
    const [paid, setPaid] = useState(false);
  
    const [coupon, setCoupon] = useState("");
    const [shopData, setShopData] = useState();
  
    const [user, setUser] = useState("");
  
    const [showStripe, setShowStripe] = useState(false);
  
  
    const [shippingCost, setShippingCost] = useState("");
    const [shippingMethod, setShippingMethod] = useState("");
  
  
    const stripe = useStripe();
    const elements = useElements();
  
  
    useEffect(() => {
      if(!shopData) {
          
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/shop`).then((response) => {
            setShopData(response.data);
          });
      }
    }, []);
  
    useEffect(() => {
      if (isLoggedIn) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
          setUser(response.data.find((user) => user.email === isLoggedIn.email));
        });
      }
    }, [isLoggedIn]);
  
  
    const [address, setAddress] = useState(user && (CryptoJS.AES.decrypt(user.address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8));
    const [zipCode, setZipCode] = useState(user && (CryptoJS.AES.decrypt(user.zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8));
    const [phone, setPhone] = useState(user && user.phone);
  
    const couponHandler = (event) => {
      setCoupon(event.target.value);
    };
  
    const addressHandler = (event) => {
      setAddress(event.target.value);
    };
  
    const zipCodeHandler = (event) => {
      setZipCode(event.target.value);
    };
  
    const phoneHandler = (event) => {
      setPhone(event.target.value);
    };
  
  
    const stripeHandler = async (event) => {
      event.preventDefault();
  
      if (!user.phone) {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${isLoggedIn._id}`, {
              method: "PATCH",
              body: JSON.stringify({ phone: phone }),
              headers: {
                "Content-Type": "application/json",
              },
            });
      }
  
      if (!user.address) {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${isLoggedIn._id}`, {
              method: "PATCH",
              body: JSON.stringify({ address: CryptoJS.AES.encrypt(address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY).toString() }),
              headers: {
                "Content-Type": "application/json",
              },
            });
      }
  
      if (!user.zipCode) {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${isLoggedIn._id}`, {
              method: "PATCH",
              body: JSON.stringify({zipCode: CryptoJS.AES.encrypt(zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY).toString() }),
              headers: {
                "Content-Type": "application/json",
              },
            });
  
      }
  
  
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
  
      if (!user.address || !user.zipCode || !user.phone ) {
        toast.error("Please Provide Your Shipping Information.", { position: "top-right" });
  
      } else {
        if (!error) {
          try {
            setPaying(true);
            const { id } = paymentMethod;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/payment`, {
              amount: Math.round(
                (coupon === shopData[0].couponCode
                  ? state.total - (shopData[0].couponPercent * 0.01 * state.total).toFixed(2) + Number(shopData[0].tax) + Number(shopData[0].shippingCost[0])
                  : Number(state.total) + Number(shopData[0].tax) + Number(shopData[0].shippingCost[0])) * 100
              ),
              id,
            });
  
  
            if (response.data.success) {
              toast.success("Payment Successful 🥳", { position: "top-right" });
              setPaying(false);
              setPaid(true);
  
              axios
                .post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders`, {
                  date: new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),
                  time: new Date().toString().substring(16, 21),
                  paid: true,
                  prepared: false,
                  sent: false,
                  customer: isLoggedIn.fullName,
                  email: isLoggedIn.email,
                  phone: user.phone,
                  address: user.address,
                  zipCode: user.zipCode,
                  total: Number(state.total) + Number(shopData && shopData[0].tax) + Number(shopData && shopData[0].shippingCost[0]),
                  basket: state.selectedItems.map((i) => `${i.title} (X${i.quantity}) each $${i.price} ${i.offPercent != 0 ? `with ${i.offPercent}% Off` : ""}`),
                })
  
  
     
                for(let i=0; i < state.selectedItems.length ; i++) {
                  axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`)
                  .then((response) =>
  
                  axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${state.selectedItems[i]._id}`, {
                      count: Number(Number(response.data[i].count)-Number(state.selectedItems[i].quantity))
                    }) &&
  
                  response.data[i].count-state.selectedItems[i].quantity==0 &&
                      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
                          from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
                          text: `Product with the ID ${state.selectedItems[i]._id} sold out!`,
                          to: `mojtabamoradli@yahoo.com`,
                          subject: `Stock Status`,
                      })
                  )
              }
  
  
  
  
              axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
                  from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
                  text: `
                  
            <table>
  
  
                <tr>
                    <td>Order Date</td>
                    <td>${new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",})}</td>
                </tr>
  
                <tr>
                    <td>Order Time</td>
                    <td>${new Date().toString().substring(16, 21)}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>$${Number(state.total) + Number(shopData && shopData[0].tax) + Number(shopData && shopData[0].shippingCost[0])}</td>
                </tr>
                <tr>
                    <td>Order Info</td>
                    <td>${state.selectedItems.map((i) => `<td>${i.title} (X${i.quantity}) each $${i.price} ${i.offPercent != 0 ? `with ${i.offPercent}% Off` : ""}</td>`)}</td>
                </tr>
  
  
            </table>
            
            
            `,
                  to: user.email,
                  subject: `Order Receipt`,
              });
  
  
  
              dispatch(clear());
            }
          } catch (error) {
            toast.error(`${error}`, { position: "top-right" });
            setPaying(false);
          }
        } else {
          toast.error(`${error.message}`, { position: "top-right" });
  
          setPaying(false);
        }
      }
    };
  
  
    return (
        <>
                    {state.itemsCounter > 0 && (
          <ReceiptBox>
                        <ReceiptContainer>

              <p><b>Total Items:</b> {state.itemsCounter}</p>
            <p><b>Coupon Code:</b></p>
            <p><Input  type="text" placeholder=" Coupon Code" value={coupon} onChange={couponHandler} /></p>
            {shopData && coupon !== shopData[0].couponCode && (<p>Enter {shopData[0].couponCode} for {shopData[0].couponCode.substring(3, 5)}% off on your total (Minus Tax & Shipping Cost)</p>)}
            {shopData && coupon === shopData[0].couponCode && <p>You saved <b>${(shopData[0].couponCode.substring(3, 5) * 0.01 * state.total).toFixed(2)}</b></p>}
            <p><b>Tax:</b> ${shopData && shopData[0].tax}</p>
            
            <p>
              <Select onChange={(e) => {setShippingCost((e.target.value).split(',')[0]); setShippingMethod((e.target.value).split(',')[1])}}>
              {shopData && shopData[0].shippingMethod[0] &&<option value={shopData && `${shopData[0].shippingCost[0]}, ${shopData[0].shippingMethod[0]}`}>{shopData && shopData[0].shippingMethod[0]}</option>}
              {shopData && shopData[0].shippingMethod[2] &&<option value={shopData && `${shopData[0].shippingCost[1]}, ${shopData[0].shippingMethod[1]}`}>{shopData && shopData[0].shippingMethod[1]}</option>}
              {shopData && shopData[0].shippingMethod[2] &&<option value={shopData && `${shopData[0].shippingCost[2]}, ${shopData[0].shippingMethod[2]}`}>{shopData && shopData[0].shippingMethod[2]}</option>}
              {shopData && shopData[0].shippingMethod[3] &&<option value={shopData && `${shopData[0].shippingCost[3]}, ${shopData[0].shippingMethod[3]}`}>{shopData && shopData[0].shippingMethod[3]}</option>}
              {shopData && shopData[0].shippingMethod[4] &&<option value={shopData && `${shopData[0].shippingCost[4]}, ${shopData[0].shippingMethod[4]}`}>{shopData && shopData[0].shippingMethod[4]}</option>}
              {shopData && shopData[0].shippingMethod[5] &&<option value={shopData && `${shopData[0].shippingCost[5]}, ${shopData[0].shippingMethod[5]}`}>{shopData && shopData[0].shippingMethod[5]}</option>}

            </Select>
            </p>
            {shippingCost &&<p><b>Shipping Cost:</b> {`$${shippingCost}`}</p>}

            {user && (
              <>
                <p><b>Address: </b>{user.address ? (CryptoJS.AES.decrypt(user.address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8) : <p><Textarea  placeholder={" Address"} value={user.address ? (CryptoJS.AES.decrypt(user.address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8) : address} onChange={addressHandler} /></p>}</p>
                <p><b>Zip Code: </b>{user.zipCode ? (CryptoJS.AES.decrypt(user.zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8) : <p><Input  placeholder={" Zip Code"} value={user.zipCode ? (CryptoJS.AES.decrypt(user.zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8) : zipCode} onChange={zipCodeHandler} /></p>}</p>
                <p><b>Phone Number: </b>{user.phone ? user.phone : <p><Input  placeholder={" Phone Number"} value={user.phone ? user.phone : phone} onChange={phoneHandler} /></p>}</p>
                {user.address && user.zipCode && user.phone && <p>For Changing or Updating Your Address, Please Navigate to Your Dashboard.</p>}
                <p>You can expect to recieve your package in <b>3</b> to <b>7</b> days.</p>
              </>
            )}

            <p><b>Total Payments: </b>${shopData && coupon === shopData[0].couponCode ? state.total - (shopData[0].couponCode.substring(3, 5) * 0.01 * state.total).toFixed(2) + Number(shopData[0].tax) + Number(shippingCost): shopData && (Math.round(Number(state.total) + Number(shopData[0].tax) + Number(shippingCost)))}</p>
            
              
            </ReceiptContainer>

            <PayButtonContainer>
            {(isLoggedIn && !showStripe) && <Button  onClick={() => dispatch(clear())}>Clear</Button>}

              {!isLoggedIn && (<Link href="/login-with-password">Login to Pay</Link>)}

              {(isLoggedIn && !showStripe) && (<Button  onClick={() => setShowStripe(true)}>Pay via Stripe</Button>)}
            </PayButtonContainer>

            {showStripe && (
              <>
                {!paid && (
                  <Stripe onSubmit={stripeHandler}>
                    <CardElement />
                    {paying ? (<Button  disabled>Paying</Button>) : (<Button>Pay</Button>)}
                  </Stripe>
                )}


              </>
            )}
          </ReceiptBox>
        )}

{state.itemsCounter === 0 && (
          <Complete>
            {paid && <h2>Payment Successful 🥳</h2>}
            <h3>Want to buy?</h3>
            <Link href="/shop">Go to shop</Link>
          </Complete>
        )}

            
        </>
    );
};

export default Receipt;