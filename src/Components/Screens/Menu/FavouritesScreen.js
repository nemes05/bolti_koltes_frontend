import { useContext, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { IconButton, Portal, Text } from 'react-native-paper'

import ApiContext from '../../../Contexts/api/api-context'
import PreferencesContext from '../../../Contexts/preferences/preferences-context'
import TopNavBar from '../../Navigation/TopNavBar'
import ErrorModal from '../../UI/ErrorModal'
import LoadIndicator from '../../UI/LoadIndicator'
import FavouriteProduct from '../../UI/Product/Favourite/FavouriteProduct'
import SimplifiedFavouriteProduct from '../../UI/Product/Favourite/SimplifiedFavouriteProduct'

/**
 * The screen that lists the favourite products (if user is logged in)
 * @param {object} navigation   The React Navigation object
 */
const FavouritesScreen = ({ navigation }) => {
    const preferences = useContext(PreferencesContext)
    const api = useContext(ApiContext)
    const navigationParent = navigation.getParent()

    const [favourites, setFavourites] = useState([])
    const [error, setError] = useState({ err: false, msg: '' })
    const [loading, setLoading] = useState(false)

    const getFavourites = async () => {
        setLoading(true)
        try {
            const favourites = await api.getFavourites()
            setFavourites(favourites)
            setLoading(false)
        } catch (err) {
            setLoading(false)

            setError({ err: true, msg: err.message })
        }
    }

    useEffect(() => {
        if (api.userStatus) getFavourites()
    }, [])

    if (error.err) {
        return (
            <Portal>
                <ErrorModal
                    message={error.msg}
                    buttonText="Vissza"
                    visible={error.err}
                    dismissable
                    onDismiss={() => {
                        setError({ err: false, msg: '' })
                    }}
                    onButtonPress={() => {
                        setError({ err: false, msg: '' })
                    }}
                />
            </Portal>
        )
    }

    if (!api.userStatus) {
        return (
            <>
                <TopNavBar
                    navigation={navigation}
                    title={
                        <IconButton
                            icon="home"
                            size={40}
                            onPress={() => {
                                navigationParent.navigate('main')
                            }}
                        />
                    }
                />

                <View style={styles.messagecontainer}>
                    <Text variant="labelLarge">Jelentkezzen be ehhez a funkcióhoz!</Text>
                </View>
            </>
        )
    }

    if (loading) {
        return (
            <>
                <TopNavBar
                    navigation={navigationParent}
                    title={
                        <IconButton
                            icon="home"
                            size={40}
                            onPress={() => {
                                navigationParent.navigate('main')
                            }}
                        />
                    }
                />
                <View style={{ marginTop: 50 }}>
                    <LoadIndicator title="Adatok betöltése folyamatban..." />
                </View>
            </>
        )
    }

    return (
        <>
            <TopNavBar
                navigation={navigationParent}
                title={
                    <IconButton
                        icon="home"
                        size={40}
                        onPress={() => {
                            navigationParent.navigate('main')
                        }}
                    />
                }
            />
            <View style={styles.listcontainer}>
                {preferences.cardSize === 'small' && (
                    <FlatList
                        data={favourites}
                        renderItem={({ item }) => (
                            <SimplifiedFavouriteProduct
                                navigation={navigationParent}
                                product={item}
                                refresh={getFavourites}
                            />
                        )}
                    />
                )}
                {preferences.cardSize === 'big' && (
                    <FlatList
                        data={favourites}
                        renderItem={({ item }) => (
                            <FavouriteProduct navigation={navigationParent} product={item} refresh={getFavourites} />
                        )}
                    />
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    listcontainer: {
        height: '100%',
        marginTop: 5,
        marginBottom: 5,
    },
    card: {
        width: '90%',
        padding: 5,
        display: 'flex',
        alignItems: 'center',
    },
    messagecontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
})

export default FavouritesScreen
