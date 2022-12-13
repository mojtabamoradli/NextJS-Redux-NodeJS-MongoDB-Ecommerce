import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import Image from "next/image";
import bcrypt from "bcryptjs";
import Loader from '../Loader';
import styles from "../../styles/shared.module.css"
import styled from 'styled-components';
import { toast, Toaster } from 'react-hot-toast';
import CryptoJS from "crypto-js"
import Head from 'next/head';

const Form = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 970px) {
    /* align-self: center;
    justify-content: center; */
    /* margin-top: 8%; */
  }

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
    width: 650px;
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
      padding-top: 74px;
    }

  }
`;
const HorizontalPart = styled.div`
display: flex;
`;
const VerticalPart = styled.div`
display: flex;
flex-direction: column;
`;
const KeyInput = styled.input`
  font-family: "Exo";
  width: 580px;
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
const Input = styled.input`
  font-family: "Exo";
  width: 270px;
  height: 40px;
  line-height: 1.5;
  font-size: 1rem;
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
const Icon = styled.span`
    font-size: 35px;
    -webkit-filter: grayscale(100%); 
  filter: grayscale(90%);
  cursor: pointer;
  margin-left: 5px;

`
const TSV = styled.div`
margin-top: 20px;

`





const PrivacyAndSecurity = () => {

    const { isLoggedIn } = useSelector((state) => state.user);


  const PrivateKey = useRef();
  const PublicKey = useRef();

  const [user, setUser] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();



  useEffect(() => {
    if (!user && isLoggedIn) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
        setUser(response.data.find((user) => user.email === isLoggedIn.email));
      });
    }
  }, [!user]);



  const togglePrivateKey = () => {
    if (PrivateKey.current.placeholder === "✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎") {
      PrivateKey.current.placeholder = user.privateKey;
    } else {
      PrivateKey.current.placeholder = "✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎";
    }
  };

  const togglePublicKey = () => {
    if (PublicKey.current.placeholder === "✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎") {
      PublicKey.current.placeholder = user.publicKey;
    } else {
      PublicKey.current.placeholder = "✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎";
    }
  };
  
  const TFAEnabler = async () => {
    if (user) {
      if (!user.TFA) {
        var secret = speakeasy.generateSecret({ name: process.env.NEXT_PUBLIC_GOOGLE_AUTHENTICATOR_DISPLAY_NAME });
        qrcode.toDataURL(secret.otpauth_url, function (error, data) {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${isLoggedIn._id}`, {
            method: "PATCH",
            body: JSON.stringify({ TFA: true, TFASecret: CryptoJS.AES.encrypt(secret.ascii, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY).toString(), TFAQR: CryptoJS.AES.encrypt(data, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY).toString() }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        });
        toast.success("2-Step verification Enabled.", {position: "top-right"})
        setUser("")
      }
      if (user.TFA) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${isLoggedIn._id}`, {
          method: "PATCH",
          body: JSON.stringify({ TFA: false, TFASecret: null, TFAQR: null }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("2-Step verification Disabled.", {position: "top-right"})
        setUser("")
      }
    }
  };

  const passwordhandler = (event) => {
    event.preventDefault();

    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
      const user = response.data.find((user) => user.email === isLoggedIn.email);

      if (currentPassword) {
        if (bcrypt.compareSync(currentPassword, user.password)) {
          if (password) {
            if (password.length > 6) {
              fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/${user._id}`, {
                method: "PATCH",
                body: JSON.stringify({ password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) }),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/send_mail`, {
                from: '"Mojtaba Moradli" contact@mojtabamoradli.ir',
                text: `<p style="font-size: 15px">Your Password for ${isLoggedIn.email} changed at ${new Date().toLocaleDateString("fa-IR-u-nu-latn", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}, ${new Date().toString().substring(15, 21)}</br> If you believe this reset is suspicious, please contact: contact@mojtabamoradli.ir</p>`,
                to: user.email,
                subject: `Successful Password Change`,
              });
              toast.success("Password Changed.", {position: "top-right"})
              setPassword("");
              setCurrentPassword("");
            } else {
              toast.error("Chosen Password needs to Be at Least 6 Character.", {position: "top-right"})
            }
          } else {
            toast.error("Please Enter New Password!", {position: "top-right"})
          }
        } else {
          toast.error("Wrong Current Password!", {position: "top-right"})
        }
      } else {
        toast.error("Please Enter Your Current Password!", {position: "top-right"})
      }
    });
  };

  


    return (

      <>
            <Head>
      <title>Dashboard | Privacy & Security</title>
    </Head>

      <Form>
              <Section>

          <label htmlFor="privateKey">Private Key: <p>{!user && <Loader />}</p></label>
          <label htmlFor="publicKey">Public Key: <p>{!user && <Loader />}</p></label>
          <label htmlFor="currentPassword">Current Password: </label>
          <label htmlFor="name">New Password: </label>
        <label>2-Step Verification: </label>
          </Section>


          <Section>
          <HorizontalPart>

          <KeyInput id="privateKey" ref={PrivateKey} placeholder={user && "✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎"} disabled />
          <Icon onClick={() => togglePrivateKey()}>🫣</Icon>
          <Icon onClick={() => navigator.clipboard.writeText(user.privateKey) && toast.success("Private Key Copied.", {position: "top-right"})}>📑</Icon>
          </HorizontalPart>

        <HorizontalPart>

          <KeyInput id="publicKey" ref={PublicKey} placeholder={user && "✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎"} disabled />
          <Icon onClick={() => togglePublicKey()}>🫣</Icon>
          <Icon onClick={() => navigator.clipboard.writeText(user.publicKey) && toast.success("Public Key Copied.", {position: "top-right"})}>📑</Icon>
        </HorizontalPart>

<VerticalPart>

          <Input id="currentPassword" type="text" name="currentPassword" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)}/>
          <Input id="password" type="text" name="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
          <Button onClick={passwordhandler} disabled={!currentPassword || !password && true}>Change Password</Button>
</VerticalPart>


<VerticalPart> 
        <label className={styles.switch}>
          <input id="TFA" type="checkbox" checked={user && user.TFA} onChange={() => TFAEnabler()} />
          <span htmlFor="FTA" className={styles.switchstyle}></span>
        </label>
        </VerticalPart>

        <TSV> 

        {user && user.TFA && (
          <>
            <p>Download and install <b>Google Authenticator</b> app on your phone,</p>
            <p>and then scan the QR code to configure your account.</p>
            <Image width="150px" height="150px" title="" alt="" src={(CryptoJS.AES.decrypt(user.TFAQR, process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY)).toString(CryptoJS.enc.Utf8)} />
          </>
        )}
        </TSV> 
        

    </Section>


<Toaster />

</Form>
</>

    );
};

export default PrivacyAndSecurity;