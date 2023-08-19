import React, {useState} from "react";
import CheckoutMenu from "./components/CheckoutMenu";
import ProductCheckout from "./components/ProductCheckout";
import GridHero from "./components/GridHero";
import { useCartContext } from "./context/CartContext";
import { Link } from "react-router-dom";
import LoadingBtn from "./components/LoadingBtn";

export default function Checkout(){
    const {cartItems, finalDate, orderPlaced} = useCartContext()

    const cartProducts = cartItems.map(item => {
        return(
        <ProductCheckout
            id={item.id}
            thumbnail={item.images[0]}
            title={item.title}
            brand={item.brand}             
            price={item.price}
            stock={item.stock}
            quantity={item.quantity}
        />
        )
    })

    const cartEmpty = 
        <div id="empty-cart">
            <h1>Your cart is empty...</h1>
            <h1><Link to='/products'>Continue Shopping</Link></h1>
        </div>

    const cartUsed = 
        <div id="checkout-div">
            <div id="checkout-inner-div" >
                <div id="product-flex-column">
                    <GridHero/>
                    {cartProducts}
                </div>
                <CheckoutMenu/>  
            </div>
        </div>

    const orderPlacedPage = 
        <div id="order-placed-div">
            <div id="order-placed-menu">
                <div id="order-placed-details">
                    <h2>Order Placed!</h2>
                    <p>Your Order will be delivered on:</p>
                    <h3>{finalDate}</h3>
                </div>
            </div>
        </div>

        function emptyOrPlaced(){
            if (orderPlaced){
                return(orderPlacedPage)
            } else {
                return(cartEmpty)
            }
        }

    return(
        <div id="checkout-title" >
            {cartItems.length < 1 ? null : <h1>Checkout</h1>}
            {cartItems.length < 1 ? emptyOrPlaced() : cartUsed}
        </div>
        
    )
}