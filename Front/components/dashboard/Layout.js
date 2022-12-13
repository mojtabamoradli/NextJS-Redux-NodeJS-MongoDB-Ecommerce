import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";


import axios from "axios";

import styled from "styled-components";

const CartSettings = dynamic(() => import("./Checkout"), { ssr: false });
const MyOrders = dynamic(() => import("./MyOrders"), { ssr: false });
const Orders = dynamic(() => import("./Orders"), { ssr: false });
const MyComments = dynamic(() => import("./MyComments"), { ssr: false });
const Comments = dynamic(() => import("./Comments"), { ssr: false });
const Storehouse = dynamic(() => import("./Storehouse"), { ssr: false });
const Accounting = dynamic(() => import("./Accounting"), { ssr: false });
const General = dynamic(() => import("./General"), { ssr: false });
const PrivacyAndSecurity = dynamic(() => import("./PrivacyAndSecurity"), { ssr: false });
const Ticket = dynamic(() => import("./Ticket"), { ssr: false });



//toastify
{
    /* <p>deadline</p>
  <p>tasks</p>
  <p>sms notify</p>
  <p>workspace</p> */
  }

const Layout = () => {

    const router = useRouter();

  const { isLoggedIn } = useSelector((state) => state.user);

  const [user, setUser] = useState();

  const [general, setGeneral] = useState(true);
  const [privacyAndSecurity, setPrivacyAndSecurity] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [checkout, setChechout] = useState(false);
  const [myOrders, setMyOrders] = useState(false);
  const [allOrders, setAllOrders] = useState(false);
  const [allComments, setAllComments] = useState(false);
  const [myComments, setMyComments] = useState(false);
  const [products, setProducts] = useState(false);
  const [accounting, setAccounting] = useState(false)




  useEffect(() => {
    if (!user && isLoggedIn) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users`).then((response) => {
        setUser(response.data.find((user) => user.email === isLoggedIn.email));
      });
    }
  }, [user]);



const Container = styled.div`
  padding: 15px;
margin: 1em auto;
/* border-radius: 10px; */
z-index: 0;
width: 70%;


@media (max-width: 775px) {
  width: 80%;
  margin: 0.8em auto;

h2 {
  margin-top: 15px;
}
}

`
const Breadcrumbs = styled.div`
ul {
display: flex;
gap: 10px;
margin-top: 10px;
margin-bottom: 10px;
align-items: center;
justify-items: center;
justify-content: center;
text-align: center;
list-style: none;
}
`
const Layout = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;


    @media (max-width: 675px) {
      display: flex;
      flex-direction: column;
    
  }

`
const Sidebar = styled.div`

    background-color: #4e0e2e;
    padding: 15px;
    border-radius: 4px 4px 4px 4px;

    /* height: 625px; */
  white-space: nowrap;
  color: #e5e5e5;

  
  @media (max-width: 775px) {
    display: grid;

justify-items: center;

  }





`
const Heading = styled.div`

display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;

    h1 {
        background-color: #e5e5e5;
    color: #4e0e2e;
    width: 48px;
    height: 50px;
    padding: 20px 20px 15px 20px;
    border-radius: 50%;

    }

    h3 {
        margin-top: 10px;
    color: #e5e5e5;
    text-align: center;
    white-space: nowrap;

    }

    p {
        text-align: center;
    margin-bottom: 15px;
    color: #e5e5e5;
    white-space: nowrap;
    }


`
const Tab = styled.div`
display: flex;
align-items: center;
align-content: center;
cursor: pointer;

`
const Icon = styled.div`
    font-size: 35px;
    -webkit-filter: grayscale(100%); 
  filter: grayscale(80%);
`
const Label = styled.div`
font-size: 18px;
margin-left: 10px;

`
const Page = styled.div`
    padding: 15px;
    background-color: #fff;
    flex: auto;
    border-radius: 4px 4px 4px 4px;
    max-height: 625px;
    overflow: scroll;


    ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.1);
  
    -webkit-border-radius: 4px 4px 4px 4px;
    border-radius: 4px 4px 4px 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px 4px 4px 4px;
  
    border-radius: 4px 4px 4px 4px;
    background: #917180;
  }
  
`


  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Container>


<Breadcrumbs>
    <ul>
      <li><Link href="/">Home</Link></li>
      {"≻"}
      <li className={router.pathname == "/dashboard" ? "active" : ""}><Link href="/services">Dashboard</Link></li>
    </ul>
  </Breadcrumbs>


  <Layout>

    <Sidebar>

      <Heading>
        <h1>{isLoggedIn && isLoggedIn.fullName[0]}</h1>
        <h3>{isLoggedIn && isLoggedIn.fullName}</h3>
        <p>{isLoggedIn && isLoggedIn.role}</p>
      </Heading>



    <div>

      <Tab className={general ? "on" : ""}            onClick={() => setGeneral((current) => !current,                                            setPrivacyAndSecurity(false), setTicket(false),   setChechout(false), setMyOrders(false),   setAllOrders(false), setAllComments(false), setMyComments(false), setProducts(false), setAccounting(false))}><Icon>🙋🏻‍♂️ </Icon><Label>General</Label></Tab>
      <Tab className={privacyAndSecurity ? "on" : ""} onClick={() => setPrivacyAndSecurity((current) => !current,   setGeneral(false),                                          setTicket(false),   setChechout(false), setMyOrders(false),   setAllOrders(false), setAllComments(false), setMyComments(false), setProducts(false), setAccounting(false))}><Icon>🔒 </Icon><Label>Security & Privacy</Label></Tab>
      <Tab className={ticket ? "on" : ""}             onClick={() => setTicket((current) => !current,               setGeneral(false),            setPrivacyAndSecurity(false),                     setChechout(false), setMyOrders(false),   setAllOrders(false), setAllComments(false), setMyComments(false), setProducts(false), setAccounting(false))}><Icon>📨 </Icon><Label>Tickets</Label></Tab>
      {user && user.role === "admin" && <>
      <Tab className={checkout ? "on" : ""}           onClick={() => setChechout((current) => !current,             setGeneral(false),            setPrivacyAndSecurity(false), setTicket(false),                       setMyOrders(false),   setAllOrders(false), setAllComments(false), setMyComments(false), setProducts(false), setAccounting(false))}><Icon>🛒 </Icon><Label>Checkout</Label></Tab>
      <Tab className={allOrders ? "on" : ""}          onClick={() => setAllOrders((current) => !current,            setGeneral(false),            setPrivacyAndSecurity(false), setTicket(false),   setChechout(false), setMyOrders(false),                        setAllComments(false), setMyComments(false), setProducts(false), setAccounting(false))}><Icon>📦 </Icon><Label>Orders</Label></Tab>
      <Tab className={allComments ? "on" : ""}        onClick={() => setAllComments((current) => !current,          setGeneral(false),            setPrivacyAndSecurity(false), setTicket(false),   setChechout(false), setMyOrders(false),   setAllOrders(false),                        setMyComments(false), setProducts(false), setAccounting(false))}><Icon>📄 </Icon><Label>Comments</Label></Tab>
      <Tab className={products ? "on" : ""}           onClick={() => setProducts((current) => !current,             setGeneral(false),            setPrivacyAndSecurity(false), setTicket(false),   setChechout(false), setMyOrders(false),   setAllOrders(false), setAllComments(false), setMyComments(false),                     setAccounting(false))}><Icon>🚚 </Icon><Label>Storehouse</Label></Tab>
      <Tab className={accounting ? "on" : ""}         onClick={() => setAccounting((current) => !current,           setGeneral(false),            setPrivacyAndSecurity(false), setTicket(false),   setChechout(false), setMyOrders(false),   setAllOrders(false), setAllComments(false), setMyComments(false), setProducts(false))                      }><Icon>💵 </Icon><Label>Accounting</Label></Tab>
      </>}
      <Tab className={myOrders ? "on" : ""}           onClick={() => setMyOrders((current) => !current,             setGeneral(false),            setPrivacyAndSecurity(false), setTicket(false),   setChechout(false),                       setAllOrders(false), setAllComments(false), setMyComments(false), setProducts(false), setAccounting(false))}><Icon>🧾 </Icon><Label>My Orders</Label></Tab>
      <Tab className={myComments ? "on" : ""}         onClick={() => setMyComments((current) => !current,           setGeneral(false),            setPrivacyAndSecurity(false), setTicket(false),   setChechout(false), setMyOrders(false),   setAllOrders(false), setAllComments(false),                       setProducts(false), setAccounting(false))}><Icon>🗣 </Icon><Label>My Comments</Label></Tab>
      </div>


    </Sidebar>

    <Page>

      {general && isLoggedIn && <General />}

      {privacyAndSecurity && <PrivacyAndSecurity />}

      {ticket && <Ticket />}

      {checkout && <CartSettings />}

      {myOrders && <MyOrders />}

      {allOrders && <Orders />}

      {myComments && <MyComments />}

      {allComments && <Comments />}

      {products && <Storehouse />}

      {accounting && <Accounting />}


    </Page>



  </Layout>



</Container>


        
        
 











    </>
  );
};

export default Layout;
