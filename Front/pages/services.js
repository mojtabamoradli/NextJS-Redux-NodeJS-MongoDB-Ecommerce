import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/services.module.css"

import meemojicoder from "../assets/img/meemojicoder.png";


import freecms from "../assets/img/freecms.svg";
import paidcms from "../assets/img/paidcms.svg";
import personalcms from "../assets/img/personalcms.svg";
import MERN from "../assets/img/MERN.svg";
import LAMP from "../assets/img/LAMP.svg";



import { useRouter } from "next/router";


export default function Services() {
  const router = useRouter();





  return (
    <>
      <Head>
        <title>Services</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {"≻"}
            <li className={router.pathname == "/services" ? "active" : ""}>
              <Link href="/services">Services</Link>
            </li>
          </ul>
        </div>

        <Image width="200px" height="200px" src={meemojicoder} alt="Emoji" />

        <div className={styles.text}>
          <p>We are a team of web developers, designers and SEO experts who create profitable presence for businesses on the web. We code and engineer online platforms using the best
          technologies available. </p>
        </div>

        <div className={styles.tech}>
          <Image  src={MERN} alt="MongoDB, ExpressJS, ReactJS, NodeJS" />
          <Image  src={LAMP} alt="Linux, Apache, MySQL, PHP" />
        </div>



        {/* <div className={styles.socilas}>
          
            <a href="https://www.researchgate.net/profile/Mojtaba-Moradli" title="ResearchGate" rel="noreferrer" target="_blank">ResearchGate</a>
            {" "}|{" "}
            <a href="https://tehran.academia.edu/MojtabaMoradli" title="Academia" rel="noreferrer" target="_blank">Academia</a>
            {" "}|{" "}
            <a href="https://medium.com/@mojtabamoradli" title="Medium" rel="noreferrer" target="_blank">Medium</a>
            {" "}|{" "}
            <a href="https://github.com/mojtabamoradli" title="GitHub" rel="noreferrer" target="_blank">GitHub</a>
            {" "}|{" "}
            <a href="https://www.youtube.com/channel/UCftqOGliU3o0t1R9Q6TccZw" title="Youtube" rel="noreferrer" target="_blank">Youtube</a>
          
        </div> */}

        <h2>We Build Brands of the Future</h2>
        <h4>With Our Broad Range of Services</h4>
        <div className={styles.services}>
          <h4>From 💅🏼 UI Design/UX Research to 💻 Web Development</h4>
        </div>

        <h2>By CMS of Your Choice</h2>


        <div className={styles.cmsContainer}>
          <div className={styles.cms}>
          <Image  src={freecms} alt="WordPress" />
          <div>
            <p>Free Content Management System</p>
            <p>Developing Template System</p>
            <p>Our choice for small online businesses and medium Ecommerce web apps</p>
          </div>
          </div>
          <div className={styles.cms}>
          <Image  src={paidcms} alt="PaidCMS" />
            <div>
              <p>Paid Content Management System</p>
              <p>Online Store Builders</p>
              <p>No service</p>
            </div>
            
          </div>
          <div className={styles.cms}>
          <Image  src={personalcms} alt="PersonalCMS" />
            <div>
              <p>Proprietary Content Management System</p>
              <p>Developing a Platform from Scratch</p>
              <p>Our choice for personal blogs, landing pages, portfolios websites, and special service web apps</p>
            </div>
            
          </div>


        </div>




        <h2>We Build a Platform that Builds Your Business</h2>
        <h4>A Place for Increasing Sales</h4>
        <div className={styles.services}>
          <h4>And a Medium for Reaching Out to Your Customers 🌏</h4>
        </div>

        <h4>Start Now by Following</h4>
        <h2>Our Simple Workflow</h2>



          <div className={styles.workFlow}>
            <div>
              <p><span>1 Consultation</span><span>Call, Message or Email For Consultation</span></p>
              <p><span> 2 Briefing</span><span>Requirements/Niche market</span></p>
              <p><span>3 Project Detailing</span><span>Writing proposal ➛ Making Gantt chart</span></p>
              <p>4 Contract</p>
              <p><span>5 Procurement</span><span>Servers/Domains/Logo/Content</span></p>
            </div>

            <div>
              <p><span>6 Creative Design</span><span>UX research ➛ Wireframe ➛ UI design</span></p>
              <p>7 Front-End/Back-End Development</p>
              <p>8 Testing & Launch</p>
              <p><span>9 Maintenance & Education</span><span>Hiring Managers and admins</span></p>
              <p><span>10 Digital Marketing</span><span>SEO - Advertisement - Social media</span></p>
            </div>


          </div>

      </div>
    </>
  );
}
