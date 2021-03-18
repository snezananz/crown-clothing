import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions.js';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, removeItemFromCart, increaseQuantity, decreaseQuantity }) => { 
    const { name, imageUrl, price, quantity } = cartItem;

    return (
    <div className='checkout-item'>
        <div className='image-container'>
        <img src={imageUrl} alt='item'/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={() => decreaseQuantity(cartItem)}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={() => increaseQuantity(cartItem)}>&#10095;</div>
        </span>
        <span className='price'>{price}</span>
        <span className='remove-button' onClick={() => removeItemFromCart(cartItem)}>&#10005;</span>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    removeItemFromCart: item => dispatch(clearItemFromCart(item)),
    increaseQuantity: item => dispatch(addItem(item)),
    decreaseQuantity: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);

