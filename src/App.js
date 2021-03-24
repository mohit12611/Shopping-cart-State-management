import logo from './logo.svg';
import './App.css';
import Cart from './cart';
import { useState } from "react";

function App() {

  let productsAll = [
    {
      productName: "Laptop",
      price: 40000,
    },
    {
      productName: "Mobile",
      price: 10000,

    },
    {
      productName: "Tablet",
      price: 30000,
    }
  ]
  const [products, setProducts] = useState(() => productsAll)
  const [cartItems, setCartItem] = useState([])
  const [total, setTotal] = useState(0)

  function handleAddtoCart(product) {
    setCartItem([...cartItems, product])
    let newTotal = parseInt(total) + parseInt(product.price);
    console.log(newTotal)
    setTotal(newTotal.toFixed(2))
    let prodIndex = products.findIndex((obj) => {
      return obj.productName == product.productName
    });
    products[prodIndex].isDisabled = true;
    console.log(products)
    // newProduct.isDisabled = true;
    setProducts([...products])
  }

  function handleRemoveCart(index) {
    let newTotal = Math.floor(total - cartItems[index].price)
    setTotal(newTotal.toFixed(2))
    cartItems.splice(index, 1)
    setCartItem([...cartItems])

  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div class="col-lg-3">

            <h1 class="my-4">Shop Name</h1>
            <div class="list-group">
              <ul class="list-group">
                {
                  cartItems.map((product, index) => {
                    return <li class="list-group-item d-flex justify-content-between align-items-center">
                      {product.productName} - Rs.{product.price}
                      <button className="btn" onClick={() => handleRemoveCart(index)}><span class="badge bg-primary rounded-pill">X</span></button>
                    </li>
                  })
                }
              </ul>
              <h3>Total : {total}</h3>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              {
                products.map((product) => {
                  return <Cart data={product} handleAddtoCart={handleAddtoCart}></Cart>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
