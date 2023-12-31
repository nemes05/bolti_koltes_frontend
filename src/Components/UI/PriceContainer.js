import { useContext } from 'react'
import { Text, useTheme } from 'react-native-paper'

import CartContext from '../../Contexts/cart/cart-context'
import ListContext from '../../Contexts/list/list-context'

/**
 * Component for displaying the price of the cart or the list
 * @param {string}  screen  The string that tells wich price should the appear, could be 'list' or 'cart'.
 */
const PriceContainer = ({ screen }) => {
    const list = useContext(ListContext)
    const cart = useContext(CartContext)
    const theme = useTheme()

    const getTotalPrice = () => {
        if (screen === 'list') {
            return list.getListPrice().toLocaleString()
        } else if (screen === 'cart') {
            return cart.getCartPrice().toLocaleString()
        }
    }

    return (
        <Text
            style={{ backgroundColor: theme.colors.secondaryContainer, padding: 10, borderRadius: 10 }}
            variant="headlineMedium"
        >
            {getTotalPrice()} Ft
        </Text>
    )
}

export default PriceContainer
