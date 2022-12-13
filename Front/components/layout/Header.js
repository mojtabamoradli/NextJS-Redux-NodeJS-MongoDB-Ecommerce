import Link from 'next/link'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logoutSuccess } from "../../redux/auth/userAction";
import Image from "next/image";



const Div = styled.div`
width: 100%;

animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;

@keyframes tracking-in-expand {
0% {
  letter-spacing: -0.5em;
  opacity: 0;
}
40% {
  opacity: 0.6;
}
100% {
  opacity: 1;
}
}

li {
  .active{
    opacity: 50%; 
    cursor: not-allowed; 
    pointer-events: none;
  }
}
`
const NavBigScreen = styled.div`
  margin-top: 20px;
  display: flex;
  background: none;
  justify-content: center;
  /* text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */

  

h1 {
  line-height: 33px;
  margin-top: 3px;

}

h2 {
  line-height: 23px;
  font-size: 20px;
  margin-top: 22px;
  margin-left: 15px;
  white-space: nowrap;
  /* animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;

  @keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
} */

@media (max-width: 350px) {
  font-size: 19px;

}

  
}


`
const NavLeft = styled.div`


@media (max-width: 768px) {
    display: none;
}

ul {
  
  display: flex;
  gap: 20px;
  margin-right: 50px;
  margin-top: 20px;

  align-items: center;
  justify-items: center;
  justify-content: center;
  text-align: center;
  list-style: none;
}
`
const NavRight = styled.div`


@media (max-width: 768px) {
    display: none;
}

ul {
  display: flex;
  gap: 20px;
  margin-left: 50px;
  margin-top: 20px;
  align-items: center;
  justify-items: center;
  justify-content: center;
  text-align: center;
  list-style: none;
}
`
const NavSmallScreen = styled.div`
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

@media (min-width: 768px) {
    display: none;
}
`

const LiBut = styled.li`

a {

/* background-color: #4e0e2e; */
/* color: #fff; */
border: #4e0e2e;
padding: 5px;
font-weight: bold;
/* font-size: 1.5rem; */
border-radius: 0.375rem;
white-space: nowrap;
}

`


const Button = styled.p`
  
  background-color: #4e0e2e;
  color: #fff;
  border: #4e0e2e;
  padding: 5px;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 0.375rem;

  :hover {
    cursor: pointer;
    opacity: 50%;
  transition: all 1s ease;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  }
  `



const CartIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  -webkit-filter: grayscale(100%); 
  filter: grayscale(80%);


span {
  position: relative;
  font-size: 0.7rem;


bottom: 14px;
right: 19px;

}
`;


const CartLink = styled.div`
  position: relative;
  right: 4px;

/* cursor: pointer; */
  font-size: 0.7rem;
  /* font-weight: bold; */
  /* color: #4e0e2e; */
`

const DashIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  -webkit-filter: grayscale(100%); 
  filter: grayscale(100%);
`

const DashLink = styled.div`

  position: relative;
  font-size: 0.7rem;


`

const LoginIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  -webkit-filter: grayscale(100%); 
  filter: grayscale(80%);

`
const AccountLink = styled.div`
  position: relative;
  /* right: 1px; */
  font-size: 0.7rem;

`

const LogoutIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  -webkit-filter: grayscale(100%); 
  filter: grayscale(80%);

`

const LogoutLink = styled.div`
  position: relative;
  /* right: 1px; */
  font-size: 0.7rem;
  color: #4e0e2e;
  font-weight: bold;
  cursor: pointer;

`

const ServicesIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  -webkit-filter: grayscale(100%); 
  filter: grayscale(80%);

`

const ServicesLink = styled.div`
  position: relative;
  /* right: 1px; */
  font-size: 0.7rem;

`


const ContactIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  -webkit-filter: grayscale(100%); 
  filter: grayscale(80%);
`

const ContactLink = styled.div`
  position: relative;
  /* right: 1px; */
  font-size: 0.7rem;
`


const ShopIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  -webkit-filter: grayscale(100%); 
  filter: grayscale(100%);
`

const ShopLink = styled.div`
  position: relative;
  /* right: 1px; */
  font-size: 0.7rem;
  
`





const Header = () => {
  const router = useRouter();




  
  const { isLoggedIn } = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cartState);

  const dispatch = useDispatch();


 

  
  return (
    <Div >
      <NavBigScreen>
        <NavLeft>
          <ul>
            
            <li className={router.pathname == "/shop/Checkout" && "active"}><CartIcon><Link href="/shop/Checkout">🛒</Link><span><Link href="/shop/Checkout">{cartState.itemsCounter}</Link></span></CartIcon><CartLink><Link href="/shop/Checkout">Cart</Link></CartLink></li>
            <li className={router.pathname == "/shop" && "active"}><ShopIcon><Link href="/shop">🛍</Link></ShopIcon><ShopLink><Link href="/shop">Shop</Link></ShopLink></li>
            {isLoggedIn 
            ? <li className={router.pathname == "/dashboard" && "active"}><DashIcon><Link href="/dashboard">⚙️</Link></DashIcon><DashLink><Link href="/dashboard">Dashboard</Link></DashLink></li>
            : (router.pathname != "/auth/login-with-password" && router.pathname != "/auth/login-with-otp" && router.pathname != "/auth/login-with-sms" && router.pathname != "/auth/signup" && <LiBut><LoginIcon><Link href="/auth/login-with-password">🙋🏻‍♂️</Link></LoginIcon><AccountLink><Link href="/auth/login-with-password">Account</Link></AccountLink></LiBut>)}

          </ul>
        </NavLeft>


        <h1><Link href="/"><a>Code<br/>Master</a></Link></h1>
        <h2>Web Dev<br/>SEO</h2>


        <NavRight >
          <ul>
            <li className={router.pathname == "/services" && "active"}><ServicesIcon><Link href="/services">👨🏻‍💻</Link></ServicesIcon><ServicesLink><Link href="/services">Services</Link></ServicesLink></li>
            <li className={router.pathname == "/contact" && "active"}><ContactIcon><Link href="/contact">📇</Link></ContactIcon><ContactLink><Link href="/contact">Contact</Link></ContactLink></li>
            {isLoggedIn && <li onClick={() => {dispatch(logoutSuccess())}}><LogoutIcon>👋🏽</LogoutIcon><LogoutLink>Logout</LogoutLink></li> }
          </ul>
        </NavRight>
      </NavBigScreen>

      <NavSmallScreen>
        <ul>
            <li><CartIcon><Link href="/shop/Checkout">🛒</Link><span><Link href="/shop/Checkout">{cartState.itemsCounter}</Link></span></CartIcon><CartLink><Link href="/shop/Checkout">Cart</Link></CartLink></li>
            <li className={router.pathname == "/shop" && "active"}><ShopIcon><Link href="/shop">🛍</Link></ShopIcon><ShopLink><Link href="/shop">Shop</Link></ShopLink></li>
            {isLoggedIn 
            ? <li><DashIcon><Link href="/dashboard">⚙️</Link></DashIcon><DashLink><Link href="/dashboard">Dash</Link></DashLink></li>
            : (router.pathname != "/auth/login-with-password" && router.pathname != "/auth/login-with-otp" && router.pathname != "/auth/login-with-sms" && router.pathname != "/auth/signup" && <LiBut><LoginIcon><Link href="/auth/login-with-password">🙋🏻‍♂️</Link></LoginIcon><AccountLink><Link href="/auth/login-with-password">Account</Link></AccountLink></LiBut>)}
            <li className={router.pathname == "/services" && "active"}><ServicesIcon><Link href="/services">👨🏻‍💻</Link></ServicesIcon><ServicesLink><Link href="/services">Services</Link></ServicesLink></li>
            <li className={router.pathname == "/contact" && "active"}><ContactIcon><Link href="/contact">📇</Link></ContactIcon><ContactLink><Link href="/contact">Contact</Link></ContactLink></li> 
            {isLoggedIn && <li onClick={() => {dispatch(logoutSuccess())}}><LogoutIcon>👋🏽</LogoutIcon><LogoutLink>Logout</LogoutLink></li> }
        </ul>
      </NavSmallScreen>
    </Div>
  );
};

export default Header;
