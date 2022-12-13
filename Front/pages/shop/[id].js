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
import dynamic from "next/dynamic";
import { fetchProductsRates } from "../../redux/productsRates/productsRatesAction";

const ProductDetails = dynamic(() => import("./ProductDetails"), { ssr: false });
const PostComments = dynamic(() => import("./PostComments"), { ssr: false });
const SimilarProducts = dynamic(() => import("./SimilarProducts"), { ssr: false });



const Details = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [product, setProduct] = useState()
  const [postComments, setPostComments] = useState("");

  const productsRates = useSelector((state) => state.productsRatesState.productsRates)
  const products = useSelector((state) => state.productsState.products);


  useEffect(() => {
    if (router.query.id != undefined) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${router.query.id}`).then((response) => {
          setProduct(response.data);
        });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (!products.length) dispatch(fetchProducts());
    dispatch(fetchProductsRates())
  }, [dispatch, products.length]);


  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments`);

      const postComments = response.data.filter(function (com) {
        return com.forId === router.query.id;
      });
      setPostComments(postComments);
    };
    fetchAPI();
  }, [router.query.id]);

  return (
    <>
    
    <ProductDetails ID={router.query.id}/>

    <PostComments postComments={postComments} />
  
    <SimilarProducts product={product} products={products} productsRates={productsRates}/>
    </>
  
  );
};

export default Details;
