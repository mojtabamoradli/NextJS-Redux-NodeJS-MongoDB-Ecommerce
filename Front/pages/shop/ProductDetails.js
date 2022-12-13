import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchProduct } from "../../redux/products/productsAction";
import Product from "./Product";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactStars from "react-rating-stars-component"
import Head from "next/head";

import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { addItem, removeItem, increase, decrease } from "../../redux/cart/cartAction";
import { fetchProductsRates } from "../../redux/productsRates/productsRatesAction";


const Details = styled.div`
  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
  }


`
const Container = styled.div`

  background-color: #fff;
  padding: 15px;
  margin: 1em auto 0em auto;
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 70%;
  
  

  @media (max-width: 768px) {
    width: 80%;
    margin: 0.8em auto;
  }

`
const CoverImage = styled.div`
display: flex;
flex-direction: column;
/* width: 450px ;
    height: 450px ; */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    @media (max-width: 1000px) {
      justify-content: center;
      align-self: center;
    } 
    img {
        border-radius: 10px;

    }
  


`
const AdditionalImages = styled.div`
text-align: left;
padding: 2px;

`
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 50px;
  border-radius: 8px;

  &:nth-child(1) {
    width: 40%;
};
&:nth-child(2) {
  width: 60%;

};

@media (max-width: 1000px) {


&:nth-child(2) {
  width: 100%;

};
padding: 0px;
margin-top: 20px;
 text-align: center;
 align-items: center;
justify-items: center;
align-content: center;
}



`
const HeadingWrapper = styled.div`
display: flex;
flex-direction: row;
font-weight: bold;
  color: #4e0e2e;
  text-align: left;
  /* margin: 25px 20px 15px; */
  font-size: 1rem;
  justify-content: space-between;
  /* height: 50px;x */
margin-bottom: 50px;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    gap: 10px;
    text-align: center;
 align-items: center;
justify-items: center;
align-content: center;


  }


`
const FooterWrapper = styled.div`
display: flex;
flex-direction: row;
/* font-weight: bold; */
  /* color: #4e0e2e; */
  text-align: left;
  /* margin: 25px 20px 15px; */
  /* font-size: 1rem; */
  justify-content: space-between;
  /* height: 50px;x */
  /* margin-top: 20px; */
  margin-bottom: 20px;

  @media (max-width: 1000px) {
    display: flex;
flex-direction: column;
text-align: center;
 align-items: center;
justify-items: center;
align-content: center;
  }
`
const Title = styled.div`
  white-space: wrap;
  font-size: 20px;

`
const Rating = styled.div`
  white-space: nowrap;

`
const Category = styled.div`
background-color: #d2d2d2;
padding: 5px;
border-radius: 0.375rem;
  font-weight: bold;
  margin-top: 50px;

  @media (max-width: 1000px) {
    margin-top: 20px;

  }

`
const Price = styled.div`
display: flex;
flex-direction: row;
 /* text-align: center; */
align-items: center;
/* justify-items: center; */
/* align-content: center; */
margin-top: 50px;

gap: 10px;
/* height: 30px; */
/* margin-top: 20px; */
@media (max-width: 1000px) {
    margin-top: 20px;

  }
`
const Last = styled.div`
  text-decoration: line-through;
color: grey;
font-weight: normal;


`
const Off = styled.div`
background-color: #d2d2d2;
padding: 5px;
border-radius: 0.375rem;
  font-weight: bold;
`
const Final = styled.div`
font-weight: bold;
`
const FixedPrice = styled.div`
  font-weight: bold;
  justify-content: left;
  text-align: left;
  margin-left: 20px;
  /* height: 30px; */
  /* margin-top: 25px; */


`
const Actions = styled.div`
justify-content: right;
text-align: right;
align-items: right;
justify-items: right;
align-content: right;
/* margin-top: 20px; */


button {
  font-size: 1rem;
  background-color: #4e0e2e;
  border: none;
  color: #fff;
  height: 40px;
  width: 150px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-left: 5px;
}
button:hover {
  opacity: 90%;
}
button:disabled {
  background-color: #d2d2d2;
  box-shadow: none;
  opacity: 100%;
  color: #000;
  cursor: default;
}
`
const ActionDispatcher = styled.div`
  background-color: #d2d2d2;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 8px;
  padding-right: 8px;
  cursor: pointer;
  color: #000;
  display: inline-block;
  &:nth-child(1) {
  margin-left:14px;
}

`
const Counter = styled.b`
  line-height: 40px;
  display: inline-block;
  width: 30px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  justify-content: center;
text-align: center;
align-items: center;
justify-items: center;
align-content: right;
`

const ProductDetails = ({ID}) => {

  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cartState);
  const { isLoggedIn } = useSelector((state) => state.user);
    
  const [product, setproduct] = useState("");

  const [ productRates, setProductRates] = useState()
  const [URL, setURL] = useState()


  const quantityCount = (cartState, id) => {
    const index = cartState.selectedItems.findIndex((item) => item._id === id);
    if (index === -1) {
      return false;
    } else {
      return cartState.selectedItems[index].quantity;
    }
  };

  const isInCart = (cartState, id) => {
    const result = !!cartState.selectedItems.find((item) => item._id === id);
    return result;
  };

  

  useEffect(() => {
    if (ID != undefined) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${ID}`).then((response) => {
          setproduct(response.data);
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/product_rate`).then((response) =>
            
            setProductRates(response.data.filter(function (item) {return item.forId === ID}))
            )
        });
    }
  }, [ID]);




const rateValue = productRates && (productRates.map((item) => Number(item.rate)).reduce(function(a, b) { return a + b; }, 0))/(productRates.map((item) => Number(item.rate.length)).length)







  const ratingHandler = (rating) => {
    if (isLoggedIn) {
      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/product_rate`, {
          date: new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric", month: "2-digit", day: "2-digit",}),
          time: new Date().toString().substring(16, 21),
          raterName: isLoggedIn.fullName,
          raterEmail: isLoggedIn.email,
          forId: ID,
          forTitle: product.title,
          rate: rating,
        })}
        toast.success("You Rated.", { position: "top-right" });

        
  }



  return (
    <>

      <Head>
        <title>{product && product.title} Details</title>
      </Head>
  
  <Container>

      {product && (
        <Details>
          <CoverImage>
            <Image width="500px" height="500px" src={!URL ? `/uploads/productsImages/${product.album[0]}` : `${URL}`} alt="product" />
          
          <AdditionalImages>
            {product.album.map((item, index) => (<Image key={index} width="100px" height="100px" src={`/uploads/productsImages/${item}`} alt="product" onClick={()=> { setURL(`/uploads/productsImages/${item}`)}}/>))}
          </AdditionalImages>
          </CoverImage>


          <DetailsContainer>

          <HeadingWrapper>
            <Title>{product.title}</Title>
            <Rating>
              {productRates && (productRates.map((item) => Number(item.rate.length)).length) 
               ? ("⭐️ " + rateValue.toFixed(1) + "/5" + ` (${productRates && (productRates.map((item) => Number(item.rate.length)).length)} Reviews${Boolean(productRates && productRates.find((item) => item.raterEmail === isLoggedIn && isLoggedIn.email)) ? " including mine)" : ")"}` ) 
               : "⭐️ No One Rated So Far!"}

              {isLoggedIn && !Boolean(productRates && productRates.find((item) => item.raterEmail === isLoggedIn.email)) && <ReactStars isHalf={true} size={20} onChange={(rating) => ratingHandler(rating)}/>}

            </Rating>
            </HeadingWrapper>

              {product.description}





            <FooterWrapper>

            <Category>#{product.category}</Category>

            <Price>
            {/* product.offPercent != "FREE" && <Off>{"Free"}</Off> */}
            {product.offPercent != 0 ? (
              <>
          
          <Last>{`$${product.price}`}</Last>
          <Off>{`-${product.offPercent}%`}</Off>
          <Final>{`$${(product.price - product.price * product.offPercent * 0.01).toFixed(2)}`}</Final>
              </>
      ) : (
        <FixedPrice>{`$${product.price}`}</FixedPrice>
      )}
        </Price>

            </FooterWrapper>

        {product.count > 0 ? (
          <Actions>
            {isInCart(cartState, product._id) ? ("") : (<button onClick={() => dispatch(addItem(product))}><b>Add to Cart</b></button>)}
            {quantityCount(cartState, product._id) === 1 && <ActionDispatcher  onClick={() => dispatch(removeItem(product))}>🗑</ActionDispatcher>}
            {quantityCount(cartState, product._id) > 1 && <ActionDispatcher  onClick={() => dispatch(decrease(product))}>➖</ActionDispatcher>}
            {quantityCount(cartState, product._id) > 0 && <Counter>{quantityCount(cartState, product._id)}</Counter>}
            {isInCart(cartState, product._id) && quantityCount(cartState, product._id) > 0 <= product.count - quantityCount(cartState, product._id) && (<ActionDispatcher  onClick={() => dispatch(increase(product))}>➕</ActionDispatcher>)}
          </Actions>
        ) : (
          <Actions><button disabled><b>Out of Stock</b></button></Actions>
        )}

          
          </DetailsContainer>
          


          </Details>
      )}



        </Container>




        <Toaster />

    </>
  );
};

export default ProductDetails;
