import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { localSignUpTime, solarSignUpDate } from "../../functions/dateTime";
import axios from "axios";
import Loader from "../Loader";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import CryptoJS from "crypto-js"
import Head from "next/head";

const Form = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 970px) {
    /* align-self: center;
    justify-content: center; */
    /* margin-top: 6%; */
  }

  label {
    font-weight: bold;
  }
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
const Textarea = styled.textarea`
  font-family: "Exo";
  width: 270px;
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
const Section = styled.div`
  &:nth-child(1) {
    width: 120px;
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
      padding-top: 28px;
    }
    &:nth-child(3) {
      padding-top: 28px;
    }
    &:nth-child(4) {
      padding-top: 28px;
    }
    &:nth-child(5) {
      padding-top: 28px;
    }
    &:nth-child(6) {
      padding-top: 73px;
    }
    &:nth-child(7) {
      padding-top: 65px;
    }
  }
`;

const General = () => {

  const { isLoggedIn } = useSelector((state) => state.user);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [IP, setIP] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    if (!IP) {
      axios.get(process.env.NEXT_PUBLIC_GET_IP_API).then((response) => {
        setIP(response.data);
      });
    }
  }, []);

  useEffect(() => {
    if (!user && isLoggedIn) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
        setUser(response.data.find((user) => user.email === isLoggedIn.email));
      });
    }
  }, [!user]);

  const phoneHandler = async (event) => {
    event.preventDefault();

      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${isLoggedIn._id}`, {
        method: "PATCH",
        body: JSON.stringify({ phone: phone }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Phone Number Submitted.", { position: "top-right" });
      setPhone("");
      setUser("");
  };

  const addressHandler = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${isLoggedIn._id}`, {
        method: "PATCH",
        body: JSON.stringify({ address: CryptoJS.AES.encrypt(address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY).toString() }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Address Submitted.", { position: "top-right" });
      setAddress("");
      setUser("");
  };

  const zipCodeHandler = async (event) => {
    event.preventDefault();

      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${isLoggedIn._id}`, {
        method: "PATCH",
        body: JSON.stringify({ zipCode: CryptoJS.AES.encrypt(zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY).toString() }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Zip Code Submitted.", { position: "top-right" });
      setZipCode("");
      setUser("");
  };

  
  return (
    <>
    <Head>
    <title>Dashboard | General</title>
  </Head>
    <Form>
      <Section>
        <label htmlFor="name">Name:</label>
        <label htmlFor="ip">IP: <p>{!IP && <Loader />}</p></label>
        <label htmlFor="signUpDate">Joined: </label>
        <label htmlFor="email">Email:</label>
        <label htmlFor="phone">Phone: <p>{!user && <Loader />}</p></label>
        <label htmlFor="zipCode">Zip Code: <p>{!user && <Loader />}</p></label>
        <label htmlFor="address">Address: <p>{!user && <Loader />}</p></label>
      </Section>

      <Section>
        <Input id="name" placeholder={isLoggedIn.fullName} disabled />
        <Input id="ip" placeholder={IP && IP} disabled />
        <Input id="signUpDate" placeholder={`${formatDistanceToNow(new Date(isLoggedIn.createdAt), { addSuffix: true })} at ${solarSignUpDate({ isLoggedIn })}, ${localSignUpTime({ isLoggedIn })}`} disabled/>
        <Input id="email" placeholder={isLoggedIn.email} disabled />
        <Input id="phone" type="text" name="phone" value={phone} placeholder={user && user.phone} onChange={(event) => setPhone(event.target.value)} />
        <Button onClick={phoneHandler} disabled={!phone || user.phone===phone && true}>{user && user.phone ? "Change Phone Number" : "Add Phone Number"}</Button>
        <Input id="zipCode" type="text" name="zipCode" value={zipCode} placeholder={user && (CryptoJS.AES.decrypt(user.zipCode, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)} onChange={(event) => setZipCode(event.target.value)} />
        <Button onClick={zipCodeHandler} disabled={!zipCode || user.zipCode===zipCode && true}>{user && user.zipCode ? "Change Zip Code" : "Add Zip Code"} </Button>
        <Textarea id="address" type="text" name="address" value={address} placeholder={user && (CryptoJS.AES.decrypt(user.address, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)} onChange={(event) => setAddress(event.target.value)} />
        <Button onClick={addressHandler} disabled={!address || user.address===address && true}>{user && user.address ? "Change Address" : "Add Address"}</Button>
      </Section>

      <Toaster />
    </Form>
    </>
  );
};

export default General;
