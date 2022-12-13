import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Loader from "../Loader";
import styled from "styled-components";
import Head from "next/head";


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


const Comments = () => {

  const [comments, setComments] = useState();


  useEffect(() => {
    if (!comments) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments`).then((response) => {
        setComments(response.data);
      });
    }
  }, [!comments]);

  const commentDeleteHandler = (props) => {
    axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments/${props}`);
setComments("")
  };

  const approveCommentHandler = (props) => {
      const RightComment = comments.find((i) => i._id === props);
      RightComment &&
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments/${RightComment._id}`, {
        method: "PATCH",
        body: JSON.stringify({ approved: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComments("")
  };

  return (
    <>
    <Head>
    <title>Dashboard | Comments</title>
  </Head>
      <Comment>
      <p>{!comments && <Loader />}</p>

        {comments &&
          comments.map((item, index) => (
            <CommentWrapper key={index}>
              <p>🪪 {item.commentatorName} {item.approved ? (<Button onClick={() => {commentDeleteHandler(item._id);}}>Delete</Button>) : (<Button onClick={() => {approveCommentHandler(item._id);}}>Approve</Button>)}<CommentDateTime>📅 {item.date} 🕐 {item.time}</CommentDateTime></p> 
              <p>🗣 {item.comment}</p> 
              <p>👉🏼 <Link href={`/shop/${item.forId}`}>{item.forTitle}</Link></p>
        </CommentWrapper>
          ))}
      </Comment>
      </>

  );
};

export default Comments;
