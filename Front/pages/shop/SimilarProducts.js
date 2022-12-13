import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchProducts } from '../../redux/products/productsAction';
import { fetchProductsRates } from '../../redux/productsRates/productsRatesAction';
import Product from './Product';

const SimilarProductsTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.17em;
  margin-top: 30px;
  margin-bottom: 15px;

 


`
const SimilarProductsContainer = styled.div`
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


const SimilarProducts = ({product, products, productsRates}) => {



    return (
        <div>
                    <SimilarProductsTitle>Similar Products</SimilarProductsTitle>

<SimilarProductsContainer>


  {products.filter((products) => product && products && products.category.includes(product.category)).map((product) => (<Product key={product._id} product={product} productRates={productsRates.filter((item) => item.forId === product._id)}/>))}
</SimilarProductsContainer>

            
        </div>
    );
};

export default SimilarProducts;