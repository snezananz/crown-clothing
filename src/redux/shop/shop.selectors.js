import { createSelector } from 'reselect';

// we do not need this any more, but I will leave it here for documentation purpose
const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5
}

const selectShop = state => state.shop;

export const selectCollections = createSelector( 
    [selectShop],
    shop =>  {
      //console.log('in selectCollections');
      //console.log(shop.collections);
      return shop.collections
    }
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
  );
  
  // we have changed SHOP_DATA from array to an object (for speed) with properties hats, sneakers, jackets, mens, womens so we change selector as well
  // and we do not need COLLECTION_ID_MAP any more

  /*export const selectCollection = collectionUrlParam => 
    createSelector(
      [selectCollections],
      collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
    );*/

    export const selectCollection = collectionUrlParam => 
    createSelector(
      [selectCollections],
      collections => collections[collectionUrlParam]
    );   