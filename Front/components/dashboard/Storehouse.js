import axios, { AxiosError } from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import productsReducer from '../../redux/products/productsReducer';
import styled from 'styled-components';
import { toast, Toaster } from 'react-hot-toast';
import Head from 'next/head';


const Nav = styled.div`
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
`
const Label = styled.div`


position: relative;
  font-size: 0.9rem;
  font-weight: bold;
color: #4e0e2e;
cursor: pointer;

`
const Icon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  -webkit-filter: grayscale(100%); 
  filter: grayscale(90%);
`
const Form = styled.div`
  display: flex;
  flex-direction: row;



  label {
    font-weight: bold;
  }
`;
const Button = styled.button`
  margin-bottom: 5px;
  width: 270px;
  height: 40px;
  background-color: #d2d2d2;
  color: #000;
  border: #d2d2d2;
  padding: 5px;
  font-size: 1rem;
  border-radius: 0.375rem;
  cursor: pointer;

  :active {
    opacity: 90%;
  }

  :disabled {
    opacity: 50%;
    cursor: default;
  }
`;
const Input = styled.input`
  font-family: "Exo";
  width: 265px;
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
const Textarea = styled.textarea`
  font-family: "Exo";
  width: 265px;
  height: 80px !important;
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  background-color: #e5e5e5;
  border: 2px solid #e5e5e5;
  border-radius: 0.375rem;
  box-shadow: 0.3s ease-in-out;
  text-align: left;
  text-indent: 5px;
  resize: none;

  height: 100px;
  /* margin-bottom: 5px; */

  :focus {
    outline: none !important;
  }
`;
const Attachment = styled.input`
/* margin: auto; */
width: 270px;

::file-selector-button {
  display: flex;
  width: 270px;
  height: 40px;
    background-color: #d2d2d2;
    color: #000;
    border: #d2d2d2;
    /* padding: 5px; */
    /* font-weight: bold; */
    font-size: 1rem;
    font-family: "Exo";
    border-radius: 0.375rem;
    /* margin-top: 5px; */



}
`
const Section = styled.div`
  &:nth-child(1) {
    width: 150px;
    padding-right: 10px;
  }


  &:nth-child(2) {
    width: 274px;
    padding-right: 10px;
  }

  label {
    display: flex;
    flex-direction: row;
    white-space: nowrap;

    &:nth-child(1) {
      padding-top: 11px;
    }
    &:nth-child(2) {
      padding-top: 28px;
    }
    &:nth-child(3) {
      padding-top: 28px;
    }
    &:nth-child(4) {
      padding-top: 20px;
    }
    &:nth-child(5) {
      padding-top: 76px;
    }
    &:nth-child(6) {
      padding-top: 28px;
    }
    &:nth-child(7) {
      padding-top: 28px;
    }
    &:nth-child(8) {
      padding-top: 27px;
    }
    &:nth-child(9) {
      padding-top: 37px;
    }
    &:nth-child(10) {
      padding-top: 37px;
    }
  }
`;
const SectionThripple = styled.div`
  &:nth-child(1) {
    width: 400px;
    padding-right: 10px;
  }

  &:nth-child(2) {
    width: 150px;
    padding-right: 10px;
  }

  &:nth-child(3) {
    width: 274px;
    padding-right: 10px;
  }

  label {
    display: flex;
    flex-direction: row;
    white-space: nowrap;

    &:nth-child(1) {
      padding-top: 11px;
    }
    &:nth-child(2) {
      padding-top: 22px;
    }
    &:nth-child(3) {
      padding-top: 80px;
    }
    &:nth-child(4) {
      padding-top: 28px;
    }
    &:nth-child(5) {
      padding-top: 28px;
    }
    &:nth-child(6) {
      padding-top: 28px;
    }
    &:nth-child(7) {
      padding-top: 28px;
    }
    &:nth-child(8) {
      padding-top: 27px;
    }
    &:nth-child(9) {
      padding-top: 37px;
    }
    &:nth-child(10) {
      padding-top: 37px;
    }
  }
`;
const SmallButton = styled.button`
  /* margin-bottom: 5px; */
  /* height: 40px; */
  width: fit-content;
  background-color: #4e0e2e;
  color: #fff;
  border: #4e0e2e;
  padding: 3px;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 14px;
font-weight: bold;


margin-top: 5px;


  @media (max-width: 465px) {
      font-size: 10px;

    }
  :active {
    opacity: 90%;
  }

  :disabled {
    opacity: 50%;
    cursor: default;
  }
`;

const Storehouse = () => {


    const [add, setAdd] = useState(true);
    const [update, setUpdate] = useState(false);
    const [del, SetDelete] = useState(false);



    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [offPercent, setOffPercent] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [rate, setRate] = useState("");
    const [count, setCount] = useState("");

    const [products, setProducts] = useState()
    const [edit, setEdit] = useState()
    const [rightProduct, setRightProduct] = useState()

    const [imageOne, setImageOne] = useState()
    const [imageTwo, setImageTwo] = useState()
    const [imageThree, setImageThree] = useState()

    const [ID, setID] = useState("");


    useEffect(() => {
      if (!products) {
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`).then((response) => {
            setProducts(response.data);
          });     
      }
    }, [!products]);



      const productAddHandler = (event) => {
        event.preventDefault();

        const data = new FormData();
  
        data.append('file', imageOne)
        data.append('file', imageTwo)
        data.append('file', imageThree)

        
        if (title && price && offPercent && description && category && rate && count && imageOne) {

            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`, {
                title: title,
                price: price,
                offPercent: offPercent,
                description: description,
                category: category,
                album: [imageOne ? imageOne.name.replace(/\s+/g, '') : "", imageTwo ? imageTwo.name.replace(/\s+/g, '') : "", imageThree ? imageThree.name.replace(/\s+/g, '') : ""],
                rate: rate,
                count: count,
              })
              .then(toast.success("Product Added.", {position: "top-right"}));
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/upload`, {
                  method: "POST",
                  body: data,
                })
              
              setTitle("")
              setPrice("")
              setDescription("")
              setOffPercent("")
              setCategory("")
              setRate("")
              setCount("")
              setImageOne("")
              setImageTwo("")
              setImageThree("")
        } else {
          toast.error("Please fill all the fields.", {position: "top-right"})
        }

        
        }




    const productUpdateHandler = (event) => {
        event.preventDefault();


        const data = new FormData();
  
        data.append('file', imageOne)
        data.append('file', imageTwo)
        data.append('file', imageThree)

        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${rightProduct._id}`, {
            title: title,
            price: price,
            offPercent: offPercent,
            description: description,
            category: category,
            album: [imageOne ? imageOne.name.replace(/\s+/g, '') : "", imageTwo ? imageTwo.name.replace(/\s+/g, '') : "", imageThree ? imageThree.name.replace(/\s+/g, '') : ""],
            rate: rate,
            count: count,
        })
        .then(alert("Product Edited."))
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/upload`, {
          method: "POST",
          body: data,
        })
      
        setTitle("")
        setPrice("")
        setDescription("")
        setOffPercent("")
        setCategory("")
        setRate("")
        setCount("")
        setImageOne("")
        setImageTwo("")
        setImageThree("")

    }

    const productDeleteHandler = (event) => {
      event.preventDefault();

      if (Boolean(products.find((item) => item._id === ID))) {
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${ID}`)
        toast.success("Product Deleted.", {position: "top-right"})
        setID("")
      } else {
        toast.error("No Such Product.", {position: "top-right"})
      }

        
            
      
    };

    


    return (
        <>
                        <Head>
      <title>Dashboard | Products</title>
    </Head>
            
        <Nav>
        <ul>
            <li className={add ? "on" : ""} onClick={() => setAdd(current => !current, setUpdate(false), SetDelete(false))}><Icon><b>➕</b></Icon><Label>Add</Label></li>
            <li className={update ? "on" : ""} onClick={() => setUpdate(current => !current, setAdd(false), SetDelete(false))}><Icon><b>🔼</b></Icon><Label>Update</Label></li>
            <li className={del ? "on" : ""} onClick={() => SetDelete(current => !current, setUpdate(false), setAdd(false))}><Icon><b>➖</b></Icon><Label>Delete</Label></li>
        </ul>
      </Nav>




        {add && 
        

<Form >
  <Section>
  <label htmlFor="title">Title:</label>
  <label htmlFor="description">Description:</label>
  <label htmlFor="price">Price:</label>
  <label htmlFor="offPercent">Off Percent:</label>
  <label htmlFor="category">Category:</label>
  <label htmlFor="rate">Rate:</label>
  <label htmlFor="count">Count:</label>
  <label htmlFor="imageOne">Cover Image:</label>
  <label htmlFor="imageTwo">Additional Image:</label>
  <label htmlFor="imageThree">Additional Image:</label>


  </Section>

  <Section>
    
  <Input id="title" value={title} onChange={event => setTitle(event.target.value)} />
  <Textarea id="description" value={description} onChange={event => setDescription(event.target.value)} />
  <Input id="price" value={price} onChange={event => setPrice(event.target.value)} />
  <Input id="offPercent" value={offPercent} onChange={event => setOffPercent(event.target.value)} />
  <Input id="category" value={category} onChange={event => setCategory(event.target.value)} />
  <Input id="rate" value={rate} onChange={event => setRate(event.target.value)} />
  <Input id="count" value={count} onChange={event => setCount(event.target.value)} />

  <Attachment id="imageOne" type="file"  onChange={(e) => setImageOne(e.target.files[0])} />
  <Attachment id="imageTwo" type="file"  onChange={(e) => setImageTwo(e.target.files[0])} />
  <Attachment id="imageThree" type="file"  onChange={(e) => setImageThree(e.target.files[0])} />


  <Button type="submit" onClick={productAddHandler}>Add Product</Button>
    </Section>
    
</Form>
        
        }




        {update && products &&

        <Form>
          <SectionThripple>
          {products && products.map((item, index) => <p key={index}><b>{item.title} ({item._id})</b> <SmallButton onClick={() => { setRightProduct(item)}}>Edit</SmallButton></p>)}

          </SectionThripple>
          {rightProduct &&
          <>
          
          <SectionThripple>
          <label htmlFor="title">Title:</label>
          <label htmlFor="price">Price:</label>
          <label htmlFor="offPercent">Off Percent:</label>
          <label htmlFor="description">Description:</label>
          <label htmlFor="category">Category:</label>
          <label htmlFor="rate">Rate:</label>
          <label htmlFor="count">Count:</label>
          <label htmlFor="imageOne">Cover Image:</label>
          <label htmlFor="imageTwo">Additional Image:</label>
          <label htmlFor="imageThree">Additional Image:</label>


          </SectionThripple>


            
          <SectionThripple>

            <Input id="title" value={title} placeholder={rightProduct.title} onChange={event => setTitle(event.target.value)} />
            <Textarea id="description" value={description} placeholder={rightProduct.description} onChange={event => setDescription(event.target.value)} />
            <Input id="price" value={price} placeholder={rightProduct.price} onChange={event => setPrice(event.target.value)} />
            <Input id="offPercent" value={offPercent} placeholder={rightProduct.offPercent}  onChange={event => setOffPercent(event.target.value)} />
            <Input id="category" value={category} placeholder={rightProduct.category} onChange={event => setCategory(event.target.value)} />
            <Input id="rate" value={rate} placeholder={rightProduct.rate} onChange={event => setRate(event.target.value)} />
            <Input id="count" value={count} placeholder={rightProduct.count} onChange={event => setCount(event.target.value)} />

            <Attachment id="imageOne" type="file"  onChange={(e) => setImageOne(e.target.files[0])} />
            <Attachment id="imageTwo" type="file"  onChange={(e) => setImageTwo(e.target.files[0])} />
            <Attachment id="imageThree" type="file"  onChange={(e) => setImageThree(e.target.files[0])} />


            <Button type="submit" onClick={productUpdateHandler}>Add Product</Button>
          </SectionThripple>
          </>

            }


        </Form>


        }

       


        {del && 
                <Form>
                  <Section>
                  <label htmlFor="ID">Product ID:</label>

                  </Section>
                  <Section>
                    
                <Input type="text" id="ID" name="ID" value={ID} onChange={(event) => setID(event.target.value)} />
     <Button onClick={productDeleteHandler} disabled={!ID && true}>Delete Product</Button>
                    </Section>
 </Form>
        
        }



<Toaster />



        </>
        
    );
    
};

export default Storehouse;