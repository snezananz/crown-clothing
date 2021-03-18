import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors.js';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch, ...otherProps }) => {
    //console.log('other props to CartDropdown:', otherProps);
    
    return (    
    
    <div className='cart-dropdown'>
        <div className='cart-items'>
        {
            cartItems.length ? 
                cartItems.map(item => (<CartItem key={item.id} item={item} />))
            :
            <span className='empty-message'>Your cart is empty</span>
        }
        </div>
        <CustomButton onClick={() => 
            {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }}>GO TO CHECKOUT</CustomButton>
    </div>
)};

// replacing this with selector
/*const mapStateToProps = ({ cart: { cartItems }}) => ({
    cartItems
});*/

// replacing with structured selector
/*const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
});*/
const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems
});

// close dropdown when checkout button clicked
// in fact, we dont need this; if connect does not receive 2nd parameter, dispatch prop is autmatically added to the all list of props to the component (named dispatch) so we can simply use it to call toggleCartHidden!

/*const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});*/

//export default CartDropdown;
export default withRouter(connect(mapStateToProps /*, mapDispatchToProps*/)(CartDropdown));