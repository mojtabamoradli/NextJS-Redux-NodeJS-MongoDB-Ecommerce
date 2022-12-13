import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Loader from '../Loader';
import styled from "styled-components";
import Head from 'next/head';





const Comment = styled.div`
  /* width: 500px; */
  /* margin: 0 100px 0 100px; */
  justify-content: center;
  align-items: center;
  align-items: center;
  align-self: center;


    /* font-size: 20px; */


`;
const CommentWrapper = styled.div`
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
const CommentDateTime = styled.span`
    color: black;
    float: right;
    `




const MyComments = () => {

    const { isLoggedIn } = useSelector((state) => state.user);

    const [comments, setComments] = useState()


    
    useEffect(() => {
        if (!comments && isLoggedIn) {
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments`).then((response) => {
            const comment = response.data.filter((item) => item.commentatorEmail === isLoggedIn.email);
            setComments(comment);
          });
        }
      }, [!comments]);




    return (
      <>
      <Head>
      <title>Dashboard | My Comments</title>
    </Head>
        <Comment>


<h3>For editing or deleting your comments, please navigate to related posts.</h3>
<p>{!comments && <Loader />}</p>

            {comments &&
              comments.map((item, index) => (
                <CommentWrapper key={index}>

                <p>👉🏼 <Link href={`/shop/${item.forId}`}>{item.forTitle}</Link><CommentDateTime>📅 {item.date} 🕐 {item.time}</CommentDateTime></p>
                <p>🗣 {item.comment}</p> 

                  <p>🔘 {item.approved ? "Approved" : "Waiting for Approval"}</p>


                </CommentWrapper>
              )) }


        
        </Comment>

        </>

    );
};

export default MyComments;