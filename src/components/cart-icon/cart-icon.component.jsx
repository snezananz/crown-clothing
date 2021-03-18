import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors.js';

import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{ itemCount }</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

// replacing this with cart selector selectCartItemsCount (which will be cached/memoized)
/*const mapStateToProps = ({cart: { cartItems }}) => ({
    itemCount: cartItems.reduce((accum, item) => (accum + item.quantity), 0 )
});*/

// Note: itemCount is a primitive (integer) and redux will do a shallow check and detect that there was no state changes between current and next state and will NOT rerender icon component. It is still good to keep the code (it still saves rerendering for cart dropdown component)

// replacing with structured selector
/*const mapStateToProps =  state => ({
    itemCount: selectCartItemsCount(state)
});*/

const mapStateToProps =  createStructuredSelector ({
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);