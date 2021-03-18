import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './header.styles.scss';
import '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='shop'>SHOP</Link>
            <Link className='option' to='shop'>CONTACT</Link>
            {  currentUser ?
                (<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> ) :
                (<Link className='option' to='/signin'>SIGN IN</Link>
            )}
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown />
        }
        
    </div>
);

// this function maps state to Header parameter (currentUser)
/*
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
}); 
*/

// Implementing cart: we now require additional object from state (cart: {hidden}), so we will add this to our argument list - and will destructure the state parameter immedately:

// replacing this with selector
/*const mapStateToProps = ({ user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
});*/

// replacing this with structured selector - it looks better
/*const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
});*/
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

//export default Header;

export default connect(mapStateToProps)(Header);