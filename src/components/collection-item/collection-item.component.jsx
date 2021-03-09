import React from 'react';

import './collection-item.styles.scss';

// we do not need any state, so will make functional component

const CollectionItem = ({id, name, price, imageUrl }) => (
    <div className='collection-item'>
        <div className='image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}/>
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
    </div>
);

export default CollectionItem; 