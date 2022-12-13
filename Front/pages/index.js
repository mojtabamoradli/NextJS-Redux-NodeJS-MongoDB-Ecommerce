import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;
const Intro = styled.div`
  margin-top: 50px;
`;
const Heading = styled.h1`
  font-size: 36px;
  color: #4e0e2e;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;

  span {
    color: #000;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
const Leading = styled.div`
  font-size: 19px;
  color: #000000;
  text-align: center;
  font-weight: 500;
  margin-bottom: 20px;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 60px;

  a:first-child {
    width: 250px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: #4e0e2e;
    border-radius: 0.375rem;
    overflow: hidden;
    border: #4e0e2e 2px solid;
    margin: 0px 20px 20px 20px;
    transition: all 0.2s ease;
    text-align: center;
    height: 60px;

    :hover {
      background-color: #4e0e2e;
      opacity: 100%;

      color: #e5e5e5;
    }
  }

  a:last-child {
    width: 250px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 0.375rem;
    overflow: hidden;
    background-color: #4e0e2e;
    color: #e5e5e5;
    margin: 0px 20px 20px 20px;
    transition: all 0.2s ease;
    text-align: center;
    height: 60px;

    :hover {
      opacity: 70%;
    }
  }

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;


export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Container>
        <Intro>
          <Heading>
            <span>Stand Out From The Crowd,</span> Shine In Digital
          </Heading>
          <Leading>
            <p>Your Online Presence Will Multiply Your Revenue</p>
            <p>We Will Help You Open Digital Shop and Take Your Business to the Next Level</p>
          </Leading>
        </Intro>

        <BtnContainer>
          <Link href="/services">Our Services</Link>
          <Link href="/contact">Reach Out</Link>
        </BtnContainer>

        <Leading>
            <p>This is a sample Project.</p>
          </Leading>

      </Container>
    </>
  );
}
