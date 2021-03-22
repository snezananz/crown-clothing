import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';


// if you wanted to use session storage you would import sessionStorage from ?? library
// this is local storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root',    // starting point for storing
    storage,
    whitelist: ['cart']   // reducer names that we want to persist in local storage
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

// note: user reducer is already persisted by firebase so we dont need to persist it here; only cart

export default persistReducer(persistConfig, rootReducer);

