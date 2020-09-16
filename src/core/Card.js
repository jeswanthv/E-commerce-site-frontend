import React from 'react';
import ImageHelper from "./helper/ImagHelper";
import {Redirect} from "react-router-dom";
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

const isAuthenticated = true;

const Card = ({
    product,
    addtoCart = true,
    removefromCart = false,
}) => {

    const cartTitle = product ? product.name : "Default image";
    const cartDescription = product ? product.description : "Default description"
    const cartPrice = product ? product.price : "Default"

    const addToCart = () => {
      if(isAuthenticated) {
        addItemToCart(product, () => {})
        console.log("Added to cart")
      }
      else{
        console.log("Please login to add items")
      }
    };

    const getAredirect = redirect => {
      if(redirect) {
        return <Redirect to="/cart" />
      }
    };

    const showAddToCart = (addtoCart) => {
      return(
        addtoCart && (
          <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
          Add to Cart
          </button>
        )
      )
    }

    const removeFromCart = (removeFromCart) => {
      return(
        removeFromCart && (
          <button
            onClick={() => {
              removeItemFromCart(product.id)
              console.log("Product has been removed")
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
          Remove from cart
          </button>
        )
      )
    }


    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
            <ImageHelper product={product}/>

            <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addtoCart)}
            </div>
            <div className="col-12">
              {removeFromCart(removefromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card;