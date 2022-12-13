import React, { useState } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';
import axios from 'axios';

const CommentsContainer = styled.div`
  background-color: #fff;
  padding: 15px;
  margin: 0.5em auto 1em auto;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 70%;
  
  

  @media (max-width: 768px) {
    width: 80%;
    /* margin: 0.8em auto; */
    /* margin: 0.2em auto 0.8em auto; */

  }


`
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
    border-radius: 4px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    font-size: 15px;
    @media (max-width: 465px) {
      font-size: 15px;

    }

    @media (max-width: 385px) {
      font-size: 12px;

    }
`
const CommentDateTime = styled.span`
  color: black !important;
    float: right;
    font-weight: normal !important;
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
float: right;
margin-right: 10px;




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
const Form = styled.div`
  display: flex;
  flex-direction: row;

`;
const BigButton = styled.button`
  /* margin-bottom: 5px; */
  /* height: 40px; */
  /* width: fit-content; */
  width: 150px;
  background-color: #4e0e2e;
  color: #fff;
  border: #4e0e2e;
  padding: 3px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
font-weight: bold;
float: right;
margin-right: 10px;




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
const Textarea = styled.textarea`
  font-family: "Exo";
  font-size: 1rem;
  line-height: 2;
  background-color: #d2d2d2;
  border: 2px solid #d2d2d2;
  border-radius: 4px;
  /* box-shadow: 0.3s ease-in-out; */
  text-align: left;
  text-indent: 5px;
  resize: none;
  margin-right: 10px;
  width: 100%;
  margin-left: 10px;


  :focus {
    outline: none;
    border: 2px solid #d2d2d2;

  }
  ::placeholder {
    color: black;
    opacity: 50%;

}
`;

const LoginToComment = styled.p`
font-weight: bold;
margin-left: 15px;
`
const CommentsTitle = styled.div`
text-align: center;
font-weight: bold;
font-size: 1.17em;
/* margin-top: 30px; */
margin-bottom: 15px;




`


const PostComments = ({postComments}) => {

    const { isLoggedIn } = useSelector((state) => state.user);


    const [comment, setComment] = useState("");
    const [mineComment, setMineComment] = useState("");
  
  
    const [edit, setEdit] = useState();
    const [editMyComment, setEditMyComment] = useState();

    const submitHandler = (event) => {
        event.preventDefault();
          axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments`, {
              date: new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),
              time: new Date().toString().substring(16, 21),
              commentatorName: isLoggedIn.fullName,
              commentatorEmail: isLoggedIn.email,
              comment,
              forId: ID,
              forTitle: product.title,
              approved: false,
            })
            .then((response) => response.data);
            toast.success("Comment Added, Waiting For Approval.", { position: "top-right" });
          setComment("");
        
      };

      const commentEditHandler = () => {
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments/${mineComment}`, {
            comment: comment,
            approved: false,
          })
          .then(toast.success("Comment Edited, Waiting For Approval.", { position: "top-right" }))
          setComment("")
          setEdit(false)
      };


    return (
        <>
        
        <CommentsContainer>


        <CommentsTitle>Customer Reviews</CommentsTitle>
        <Comment>


      {postComments && postComments.map((item, index) => item.approved && (
      <CommentWrapper key={index} >
        <p>

          <b>{item.commentatorName}:</b> {item.comment}
           <CommentDateTime>📅 {item.date} 🕐 {item.time}</CommentDateTime>

          {isLoggedIn && item.commentatorEmail === isLoggedIn.email && (
            <>
          
            <Button onClick={() => axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments/${item._id}`).then(toast.success("Comment Deleted.", { position: "top-right" }))}>Delete</Button>
            <Button onClick={() => {setEdit(current => !current);setEditMyComment(item.comment); setMineComment(item._id);}}>Edit</Button>
            
            </>
        
                  
                )}
              </p>
              </CommentWrapper>
            )
        )}
        </Comment>


    {!isLoggedIn ? (
        <LoginToComment>Login to Add Your Review.</LoginToComment>
      ) : (
      
          <Form>
            <Textarea  tyle="text" placeholder={edit ? editMyComment : "Write Something..."} value={comment} onChange={(event) => setComment(event.target.value)} />
          {edit ? <BigButton onClick={commentEditHandler}>Submit Edit</BigButton> : <BigButton onClick={submitHandler} disabled={!comment ? true : false}>Add Review</BigButton>}
          </Form>

        
      )}

      </CommentsContainer>

      <Toaster />

        </>



    );
};

export default PostComments;