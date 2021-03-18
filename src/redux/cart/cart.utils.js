export const addItemToCart = (cartItems, newItem) => {
    // does new item already exist in the array?
    const existingCartItem = cartItems.find(item => item.id === newItem.id);

    // must return NEW array in both cases
    if(existingCartItem){
        // return same array but with new item's quantity increased by 1
        return cartItems.map(item => item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item);
    };
    // else append new item to the end of the array, with quantity of 1
    return [...cartItems, { ...newItem, quantity: 1 }];    
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find(item => item.id === itemToRemove.id);

    if(existingCartItem){
        if(existingCartItem.quantity > 1){
            return cartItems.map(item => item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1} : item);
        } else {
            return cartItems.filter(item => item.id !== itemToRemove.id);   
        }                         
    };

    // else no change
    return cartItems;
}
