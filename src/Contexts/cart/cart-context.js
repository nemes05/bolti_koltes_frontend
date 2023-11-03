import React from 'react'

const CartContext = React.createContext({
    addProduct: (product) => {},
    removeProduct: (barcode) => {},
    updateProduct: (product, newPieces, newShopID, inCart) => {},
    getCartPrice: () => {},
    getShopPrice: (product, shopID) => {},
    emptyCart: () => {},
    initCart: () => {},
    cart: [],
})

export default CartContext