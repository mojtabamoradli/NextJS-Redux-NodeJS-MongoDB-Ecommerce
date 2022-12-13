import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  /* margin-top: 40px; */
  align-self: center;
    text-align: center;
    justify-content: center;
    align-items: center;
    `

const SearchInput = styled.input`

font-family: "Exo";
  width: 310px;
  height: 40px;
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  background-color: #e5e5e5;
  border: 2px solid #e5e5e5;
  border-radius: 0.375rem;
  box-shadow: 0.3s ease-in-out;
  text-align: left;
  text-indent: 5px;
  outline: none !important;
  margin-bottom: 5px;
`;

const Search = styled.div`
display: block;
position: fixed;
/* left: 105px; */
top: 210px;
transition: all 0.25s ease-in 0s;
z-index: 111;
-webkit-backdrop-filter: blur(8px);
backdrop-filter: blur(8px);
width: 310px;
/* margin-top: 300px; */

align-self: center;
    text-align: center;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      top: 270px;

    }

div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 5px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  justify-content: left;

  p {
    margin-left: 10px;
  }
}

img {
  border-radius: 3px;
}
`;

const ProductSearcch = () => {

  const [search, setSearch] = useState();
  const [searchedProducts, setSearchProducts] = useState();

  const products = useSelector((state) => state.productsState.products);

  useEffect(() => {
    if (search) {

    setSearchProducts(products && products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())))
  }

  }, [search]);


  return (
    <SearchWrapper>
      <SearchInput placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value)} />

      {search && (
      <Search>
          {searchedProducts && searchedProducts.map((product) => (
            <Link key={product._id} href={`/shop/${product._id}`}>
              <div>
                <Image width="40px" height="40px" src={`/uploads/productsImages/${product.album[0]}`} alt="" />
                <p>{product.title}</p>
              </div>
            </Link>
          ))}
        </Search>
      )}
    </SearchWrapper>
  );
};

export default ProductSearcch;
