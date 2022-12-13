import icon from "../../assets/img/icon.png";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Div = styled.div`
  align-items: center;
  justify-items: center;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 30px;

  font-size: 15px;

  a {
    font-weight: normal;
  }

  @media (max-width: 420px) {
    font-size: 14px;
  }

  @media (max-width: 340px) {
    font-size: 12px;
  }

  .image {
    justify-content: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2em;
    background: none;
  }

  .p {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const FooterNav = styled.div`
  /* font-size: 14px; */
  font-weight: normal;
`;

const Footer = () => {
  return (
    <Div>
      <Image width="45px" height="33px" title="LOGO" alt="Mojtaba Moradli" src={icon} />
      <FooterNav>
        <Link href="/shop">Shop</Link>
        {" | "}
        <Link href="/services">Services</Link>
        {" | "}
        <Link href="/contact">Contact</Link>
        {" | "}
        <Link href="/rules/terms-of-use">Terms of Use</Link>
        {" | "}
        <Link href="/rules/privacy-policy">Privacy Policy</Link>
      </FooterNav>

      <p>
        Copyright &copy; <span>{new Date().getFullYear()}</span> <Link href="/">Mojtaba Moradli</Link>. All Rights Reserved.
      </p>
    </Div>
  );
};

export default Footer;
