import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";


import styled from "styled-components"
import { addItem, removeItem, increase, decrease } from "../../redux/cart/cartAction";



const Container = styled.div`

width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  border-radius: 10px;
  overflow: hidden;
  margin: 0 10px 50px;
  transition: all 0.2s ease;
  text-align: center;
  height: 415px;

  :hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

`

const Heading = styled.div`
display: flex;
flex-direction: row;
font-weight: bold;
  color: #4e0e2e;
  text-align: left;
  margin: 25px 20px 15px;
  font-size: 1rem;
  justify-content: space-between;
  white-space: wrap;
  height: 50px;

  &:nth-child(1) {
    width: 40% !important;
  }


`

const Price = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
 text-align: center;
align-items: center;
justify-items: center;
align-content: center;
gap: 65px;
height: 30px;
margin-top: 30px;
margin-bottom: 0px;

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
  height: 30px;
  margin-top: 25px;


`
const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  line-height: 30px;

  a {
    margin-right: 33px;
  }
  
`

const Actions = styled.div`
button {
  font-size: 0.9rem;
  background-color: #4e0e2e;
  border: none;
  color: #fff;
  height: 33px;
  width: 120px;
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
  line-height: 30px;
  display: inline-block;
  width: 30px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
`

const Product = ({ product, productRates }) => {

  const cartState = useSelector((state) => state.cartState);

  const dispatch = useDispatch();


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



  return (
    <Container>

      <Image  width="230px" height="200px" src={`/uploads/productsImages/${product.album[0]}`} alt="product" />

      <Heading>
        <div>{product.title}</div> 
        <div>{productRates && productRates[0] ? `⭐️${productRates[0].rate}` : ""}</div>
      </Heading>


      {product.offPercent != 0 ? (
        <Price>
          
          <Final>{`$${(product.price - product.price * product.offPercent * 0.01).toFixed(2)}`}<Last>{`$${product.price}`}</Last></Final>
          <Off>{`-${product.offPercent}%`}</Off>
        </Price>
      ) : (
        <FixedPrice>{`$${product.price}`}</FixedPrice>
      )}

      

      <ActionsContainer>
        <Link href={`/shop/${product._id}`}>Details</Link>

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
      </ActionsContainer>
    </Container>
  );
};

export default Product;
