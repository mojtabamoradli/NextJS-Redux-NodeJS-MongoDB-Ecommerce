import React from "react";
import styles from "../../styles/shared.module.css";

import Product from "./Product";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "../../redux/products/productsAction";

import styled from "styled-components";
import Loader from "../../components/Loader";
import { fetchProductsRates } from "../../redux/productsRates/productsRatesAction";


const Filter = styled.div`
margin-top: 20px;
align-self: center;
    text-align: center;
    justify-content: center;
    align-items: center;

    label {

        &:nth-child(1) {
            margin-right: 20px;
        }

        span {
            white-space: nowrap;
            
            p {
                margin-top: 25px;
                font-size: 15px;
                font-weight: bold;
            }
        }
    }

`
const FilteredProducts = styled.div`
    margin-top: 20px;

h2 {
    text-align: center;
    /* margin-top: 10px; */
    margin-bottom: 10px;

}
`

const LoaderWrapper = styled.div`
    text-align: center;
align-self: center;
    text-align: center;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  justify-content: center;
  align-items: center;
  padding: 0 150px;

  @media (max-width: 1200px) {
    justify-content: center;

    padding: 0px 80px;
  
}

@media (max-width: 768px) {
    padding: 0px 40px;
  
}

@media (max-width: 555px) {
    justify-content: center;
    padding: 0px 10px;
  
}

  `

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsState.products);

  const productsRates = useSelector((state) => state.productsRatesState.productsRates)

  useEffect(() => {
    if (!products.length) dispatch(fetchProducts());
    dispatch(fetchProductsRates())
  }, [dispatch, products.length]);

  const [categoryOne, setCategoryOne] = useState(false);
  const [categoryTwo, setCategoryTwo] = useState(false);
//   const [stock, setStock] = useState(false);
//   const [off, setOff] = useState(false);

  return (
    <div>
      <Filter>
        <label className={styles.switch}>
          <input id="cat1" type="checkbox" value={categoryOne} onChange={() => setCategoryOne(!categoryOne)} />
          <span htmlFor="cat1" className={styles.switchstyle}>
            <p>Books</p>
          </span>
        </label>
        <label className={styles.switch}>
          <input id="cat2" type="checkbox" value={categoryTwo} onChange={() => setCategoryTwo(!categoryTwo)} />
          <span htmlFor="cat2" className={styles.switchstyle}>
            <p>Codes</p>
            
          </span>
        </label>
        {/* <label className={styles.switch}>
          <input id="stockStatus" type="checkbox" value={stock} onChange={() => setStock(!stock)} />
          <span htmlFor="stockStatus" className={styles.switchstyle}>
            In Stock
          </span>
        </label>
        <label className={styles.switch}>
          <input id="offStatus" className={styles.input} type="checkbox" value={off} onChange={() => setOff(!off)} />
          <span htmlFor="offStatus" className={styles.switchstyle}>
            Off Products
          </span>
        </label> */}
      </Filter>

      <FilteredProducts>

      {categoryOne && <h2>Books</h2>}
      {products ? <Container>{ (categoryOne && products.filter((product) => product.category === "Book").map((product) => <Product key={product._id} product={product} productRates={productsRates.filter((item) => item.forId === product._id)}/>)) }</Container>  : <LoaderWrapper><Loader /></LoaderWrapper>}
      

      {categoryTwo && <h2>Codes</h2>}
      {products ? <Container>{(categoryTwo && products.filter((product) => product.category === "Code").map((product) => <Product key={product._id} product={product} productRates={productsRates.filter((item) => item.forId === product._id)}/>))}</Container> : <LoaderWrapper><Loader /></LoaderWrapper>}
      
{/* 
      {stock && <h2>In Stock Products</h2>}
      <Container>{stock && products.filter((product) => product.count != 0).map((product) => <Product key={product._id} product={product} />)}</Container>

      {off && <h2>Off Products</h2>}
      <Container>{off && products.filter((product) => product.offPercent != 0).map((product) => <Product key={product._id} product={product} />)}</Container> */}

      {/* {categoryOne && !categoryTwo && <h2>All Products</h2>} */}
      {products ? <Container>{ (!categoryOne && !categoryTwo && products.map((product) => <Product key={product._id} product={product} productRates={productsRates.filter((item) => item.forId === product._id)}/>))} </Container>: <LoaderWrapper><Loader /></LoaderWrapper>}
      
      </FilteredProducts>

    </div>
  );
};

export default Products;
