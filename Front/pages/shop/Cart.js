import { useDispatch } from "react-redux";
import Image from "next/image";
import styled from "styled-components";
import { removeItem, decrease, increase } from "../../redux/cart/cartAction";


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 4px;

  @media (max-width: 470px) {
    flex-direction: column;
  }


`



const Title = styled.div`
font-size: 15px;
font-weight: bold;
`
const Price = styled.div`
display: flex;
flex-direction: row;
 /* text-align: right; */
align-items: center;
/* justify-items: right; */
/* align-content: right; */
/* margin-top: 50px; */
white-space: nowrap;

gap: 10px;
/* height: 30px; */
/* margin-top: 20px; */
@media (max-width: 1000px) {
    /* margin-top: 20px; */

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
justify-content: center;
/* text-align: right;
align-items: right;
justify-items: right;
align-content: right; */
right: 0px;


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


const Cart = (props) => {
  const dispatch = useDispatch();
  const { album, count, title, price, quantity, offPercent } = props.data;

  return (
    <Container>
      <Image width="80px" height="80px" src={`/uploads/productsImages/${album[0]}`} alt="" />

        <Title>{title.substring(0,30)}</Title>

        <Price>
            {/* product.offPercent != "FREE" && <Off>{"Free"}</Off> */}
            {offPercent != 0 ? (
              <>
          
          <Last>{`$${price}`}</Last>
          <Off>{`-${offPercent}%`}</Off>
          <Final>{`$${(price - price * offPercent * 0.01).toFixed(2)}`}</Final>
              </>
      ) : (
        <FixedPrice>{`$${price}`}</FixedPrice>
      )}
        </Price>



        <Actions>
            {quantity === 1 && <ActionDispatcher  onClick={() => dispatch(removeItem(props.data))}>🗑</ActionDispatcher>}
            {quantity > 1 && <ActionDispatcher  onClick={() => dispatch(decrease(props.data))}>➖</ActionDispatcher>}
            {quantity > 0 && <Counter>{quantity}</Counter>}
            {quantity > 0 <= count - quantity && (<ActionDispatcher  onClick={() => dispatch(increase(props.data))}>➕</ActionDispatcher>)}
          </Actions>

    </Container>
  );
};

export default Cart;
