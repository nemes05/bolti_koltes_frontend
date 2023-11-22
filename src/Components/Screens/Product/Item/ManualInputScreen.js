import { useContext, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Button, Portal, IconButton } from 'react-native-paper'

import ApiContext from '../../../../Contexts/api/api-context'
import TopNavBar from '../../../Navigation/TopNavBar'
import CategoryCard from '../../../UI/CategoryCard'
import ErrorModal from '../../../UI/ErrorModal'
import SearchProduct from '../../../UI/Product/SearchProduct'

const ManualInputScreen = ({ navigation }) => {
    const api = useContext(ApiContext)
    const shops = api.shops

    const [categoryList, setCategoryList] = useState([])
    const [mainCatIndex, setMainCatIndex] = useState(undefined)
    const [products, setProducts] = useState([])
    const [error, setError] = useState({ err: false, msg: '' })

    const shopSelectHandler = async (ShopID) => {
        const array = await api.getCategories(ShopID)
        if (array.length === 0) {
            setError({ err: true, msg: 'Nincsenek kategóriák ebben a boltban!' })
            return
        }
        setCategoryList(array)
    }

    const mainCategorySelect = (CategoryID) => {
        const index = categoryList.findIndex((category) => category.MainCategoryID === CategoryID)
        if (categoryList[index].SubCategories.length === 0) {
            setError({ err: true, msg: 'Nincsenek további kategóriák!' })
            return
        }
        setMainCatIndex(index)
    }

    const subCategorySelect = async (SubCatIndex) => {
        const array = await api.getProductsInCategory(SubCatIndex)
        if (array.length === 0) {
            setError({ err: true, msg: 'Nincsenek termékek a kategóriában!' })
            return
        }
        setProducts(array)
    }

    const hideError = () => {
        setError({ err: false, msg: '' })
    }

    const onBackHandler = () => {
        if (mainCatIndex !== undefined) {
            setMainCatIndex(undefined)
        } else if (categoryList.length > 0) {
            setCategoryList([])
        }
    }

    if (categoryList.length === 0) {
        return (
            <>
                <TopNavBar
                    navigation={navigation}
                    title={
                        <IconButton
                            icon="home"
                            size={40}
                            onPress={() => {
                                navigation.navigate('main')
                            }}
                        />
                    }
                />

                <Portal>
                    <ErrorModal
                        message={error.msg}
                        buttonText="Vissza"
                        visible={error.err}
                        dismissable
                        onDismiss={hideError}
                        onButtonPress={hideError}
                    />
                </Portal>

                {categoryList.length === 0 && (
                    <FlatList
                        data={shops}
                        renderItem={({ item }) => (
                            <CategoryCard
                                key={item.ShopID}
                                id={item.ShopID}
                                title={item.ShopName}
                                onSelect={shopSelectHandler}
                            />
                        )}
                    />
                )}
            </>
        )
    }

    if (products.length === 0) {
        return (
            <>
                <TopNavBar
                    navigation={navigation}
                    title={
                        <IconButton
                            icon="home"
                            size={40}
                            onPress={() => {
                                navigation.navigate('main')
                            }}
                        />
                    }
                />

                <Portal>
                    <ErrorModal
                        message={error.msg}
                        buttonText="Vissza"
                        visible={error.err}
                        dismissable
                        onDismiss={hideError}
                        onButtonPress={hideError}
                    />
                </Portal>

                {mainCatIndex === undefined && (
                    <FlatList
                        data={categoryList}
                        renderItem={({ item }) => (
                            <CategoryCard
                                key={item.MainCategoryID}
                                id={item.MainCategoryID}
                                title={item.MainCategoryName}
                                onSelect={mainCategorySelect}
                            />
                        )}
                    />
                )}

                {mainCatIndex !== undefined && (
                    <FlatList
                        data={categoryList[mainCatIndex].SubCategories}
                        renderItem={({ item }) => (
                            <CategoryCard
                                key={item.SubCategoryID}
                                id={item.SubCategoryID}
                                title={item.SubCategoryName}
                                onSelect={subCategorySelect}
                            />
                        )}
                    />
                )}

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button mode="contained" style={{ width: '50%', marginBottom: 10 }} onPress={onBackHandler}>
                        Vissza
                    </Button>
                </View>
            </>
        )
    }

    return (
        <>
            <TopNavBar
                navigation={navigation}
                title={
                    <IconButton
                        icon="home"
                        size={40}
                        onPress={() => {
                            navigation.navigate('main')
                        }}
                    />
                }
            />

            <Portal>
                <ErrorModal
                    message={error.msg}
                    buttonText="Vissza"
                    visible={error.err}
                    dismissable
                    onDismiss={hideError}
                    onButtonPress={hideError}
                />
            </Portal>

            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <SearchProduct
                        key={item.Barcode}
                        navigation={navigation}
                        Barcode={item.Barcode}
                        Name={item.Name}
                        ImageLink={item.ImageLink}
                    />
                )}
            />
        </>
    )
}

export default ManualInputScreen
