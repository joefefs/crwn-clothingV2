import React from 'react';

import {CartItemContainer, CartItemDetails, ItemDetails, CartItemImage} from './cart-item.styles.js'

function CartItem({ cartItem }) {
    const { name, quantity, imageUrl, price } = cartItem
    return (
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt={name} />
            <CartItemDetails>
                <ItemDetails className='name'>{name}</ItemDetails>
                <ItemDetails className='price'>{quantity} x ${price}</ItemDetails>
            </CartItemDetails>
            
            
        </CartItemContainer>
    );
}

export default CartItem;