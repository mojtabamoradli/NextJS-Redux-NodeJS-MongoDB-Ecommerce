import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import meemojicall from "../assets/img/meemojicall.png";
import { useRouter } from "next/router";
import styles from "../styles/contact.module.css"

export default function Contact() {
  const router = useRouter();





  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>


      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <ul><li><Link href="/">Home</Link></li>{"≻"}<li className={router.pathname == "/contact" ? "active" : ""}><Link href="/contact">Contact</Link></li></ul>
        </div>

        <Image width="200px" height="200px" src={meemojicall} alt="Emoji"/>

          <h2>Reach Out to the Experts</h2>
          <p>Let Us Help You to Show Off Your Business</p>
          <p>Call, Message or Email For Consultation</p>

          <div className={styles.contacts}>


              <a href="tel:+(98) ">+(98) 912 123 4567</a>
              <a href="https://ir.linkedin.com" title="LinkedIn" rel="noreferrer" target="_blank"> LinkedIn</a>
              <a href={`mailto:${""}`}>contact@sample.ir</a>
          </div>

          
      </div>
    </>
  );
}
