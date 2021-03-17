import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors.js';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
        {
            cartItems.map(item => (<CartItem key={item.id} item={item} />))
        }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

// replacing this with selector
/*const mapStateToProps = ({ cart: { cartItems }}) => ({
    cartItems
});*/

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
});

//export default CartDropdown;
export default connect(mapStateToProps)(CartDropdown);