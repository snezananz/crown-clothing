import React from 'react';
import {Link} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { connect } from 'react-redux';

import './header.styles.scss';
import '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => (
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
        </div>
    </div>
);

// this function maps state to Header parameter (currentUser)
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

//export default Header;

export default connect(mapStateToProps)(Header);