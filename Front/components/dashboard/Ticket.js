import axios from "axios";
import moment from "jalali-moment";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image"
import { useRouter } from "next/router";

import styled from "styled-components" 
import Link from "next/link";
import { toast, Toaster } from 'react-hot-toast';



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
const Form = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 5px;
  @media (min-width: 970px) {
    align-self: center;
    justify-content: center;
    /* margin-top: 12%; */
  }

  label {
    font-weight: bold;
  }
`;
const Button = styled.button`
  margin-bottom: 5px;
  width: 500px;
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
const Select = styled.select`
  font-family: "Exo";
  width: 500px;
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
  width: 496px;
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
    width: 500px;
    padding-right: 10px;
  }
  label {
    display: flex;
    flex-direction: row;
    white-space: nowrap;

    &:nth-child(1) {
      padding-top: 10px;
    }
    &:nth-child(2) {
      padding-top: 18px;
    }
    &:nth-child(3) {
      padding-top: 73px;
    }

  }
`;
const Attachment = styled.input`
margin: auto;
width: 500px;

::file-selector-button {
  display: flex;
  width: 500px;
    height: 40px;
    background-color: #d2d2d2;
    color: #000;
    border: #d2d2d2;
    /* padding: 5px; */
    /* font-weight: bold; */
    font-size: 1rem;
    font-family: "Exo";
    border-radius: 0.375rem;
    /* margin-top: 5px; */

    align-self: center;
    text-align: center;
    justify-content: center;
    align-items: center;

}
`
const Tickets = styled.div`
  /* width: 500px; */
  /* margin: 0 100px 0 100px; */
  justify-content: center;
  align-items: center;
  align-items: center;
  align-self: center;


    /* font-size: 20px; */




`;
const TicketWrapper = styled.div`
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
const TicketInfo = styled.span`
    font-weight: bold;
    color: black;
    float: left;
`

const TicketDateTime= styled.span`
    color: black;
    float: right;
    `


const Ticket = () => {
  const { isLoggedIn } = useSelector((state) => state.user);


  const [to, setTo] = useState("");

  const [incomingTickets, setIncomingTickets] = useState("");
  const [outgoingTickets, setOutgoingTickets] = useState("");

  const [message, setMessage] = useState("");

  const [attachment, setAttachment] = useState();


  const [newTicket, setNewTicket] = useState(true);
  const [inbox, setInbox] = useState(false);
  const [outbox, setOutbox] = useState(false)


  useEffect(() => {
    if (isLoggedIn) {
      if (!incomingTickets || !outgoingTickets) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tickets`).then((response) => {
          setIncomingTickets(response.data.filter((ticket) => ticket.to === isLoggedIn.email));
          setOutgoingTickets(response.data.filter((ticket) => ticket.from === isLoggedIn.email));
        });
      }
    }
  },[!incomingTickets, !outgoingTickets])


  const sendTicket = (e) => {
    e.preventDefault();

      if (!attachment) {

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tickets`, {
          to,
          message,
          from: isLoggedIn.email,
          attachment: attachment ? attachment.name.replace(/\s+/g, '') : "none",
          time: new Date().toString().substring(16, 21),
          date: new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit" })
        })
        toast.success("Ticket Sent.", {position: "top-right"})
        setTo("")
        setMessage("")
        setAttachment("")
        setIncomingTickets("")
        setOutgoingTickets("")
      }

      if (attachment && attachment.size > 10 * 1024 *1024) {
        toast.error("File size must be less than 10MB.", {position: "top-right"})
      } else {
        const data = new FormData();
        data.append('file', attachment)

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tickets`, {
          to,
          message,
          from: isLoggedIn.email,
          attachment: attachment ? attachment.name.replace(/\s+/g, '') : "none",
          time: new Date().toString().substring(16, 21),
          date: new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit" })
        })
        toast.success("Ticket Sent.", {position: "top-right"})
        setTo("")
        setMessage("")
        setAttachment("")
        setIncomingTickets("")
        setOutgoingTickets("")
  
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tickets/upload`, {
          method: "POST",
          body: data,
          email: isLoggedIn.email
        })
      }

    
  };


  return (
    <>

<Head>
      <title>Dashboard | Tickets</title>
    </Head>

<Nav>
        <ul>
            <li className={newTicket ? "on" : ""} onClick={() => setNewTicket((current) => !current, setInbox(false), setOutbox(false))}><Icon><b>🤙🏼</b></Icon><Label>New</Label></li>
            <li className={inbox ? "on" : ""} onClick={() => setInbox((current) => !current, setNewTicket(false), setOutbox(false))}><Icon><b>📥</b></Icon><Label>Inbox</Label></li>
            <li className={outbox ? "on" : ""} onClick={() => setOutbox((current) => !current, setInbox(false), setNewTicket(false))}><Icon><b>📤</b></Icon><Label>Outbox</Label></li>
        </ul>
      </Nav>


{newTicket &&

      <Form>

      <Section>
      <label htmlFor="to">To:</label>
      <label htmlFor="message">Message:</label>
      <label htmlFor="attachment">Attachment:</label>


      </Section>

      <Section>
      <Select value={to} onChange={(e) => setTo(e.target.value)}>
    <option value="mojtabamoradli@yahoo.com">Support</option>
    <option value="contact@mojtabamoradli.ir">Sales</option>
  </Select>

        <Textarea   type="text" onChange={(e) => setMessage(e.target.value)} value={message} />
        <Attachment   type="file" onChange={(e) => setAttachment(e.target.files[0])} />
        <Button onClick={sendTicket} disabled={!message || !to && true}>Send</Button>
      </Section>




      </Form>
}








<Tickets>

{inbox &&

      incomingTickets && incomingTickets.map((ticket, index) => (
          <TicketWrapper key={index} >
            <p><TicketInfo>📥 {ticket.from}</TicketInfo><TicketDateTime>📅 {ticket.date} 🕐 {ticket.time}</TicketDateTime></p>
            <p>📄 {ticket.message}</p>
            {ticket.attachment != "none" && <a  href={`/uploads/ticketsFiles/${ticket.attachment}`} target="_blank" rel="noopener noreferrer">📎 Attachments</a>}
          </TicketWrapper>
        ))
}

{outbox && 

      outgoingTickets && outgoingTickets.map((ticket, index) => (
          <TicketWrapper key={index} >
            <p> <TicketInfo>📤 {ticket.to}</TicketInfo><TicketDateTime>📅 {ticket.date} 🕐 {ticket.time}</TicketDateTime></p>
            <p>📄 {ticket.message}</p>
            {ticket.attachment != "none" && <a href={`/uploads/ticketsFiles/${ticket.attachment}`} target="_blank" rel="noopener noreferrer">📎 Attachments</a>}
       

          </TicketWrapper>
        ))
}
           
                  </Tickets>


                  <Toaster />


    </>
  );
};

export default Ticket;
