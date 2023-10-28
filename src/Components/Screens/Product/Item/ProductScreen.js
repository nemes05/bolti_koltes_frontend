import { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import { Button, Card, IconButton, TextInput, Text, Portal, Modal, Snackbar } from 'react-native-paper'

import ApiContext from '../../../../api/api-context'
import CartContext from '../../../../list-cart/cart-context'
import ListContext from '../../../../list-cart/list-context'
import TopNavBar from '../../../Navigation/TopNavBar'
import Dropdown from '../../../UI/Dropdown'

const ProductScreen = (props) => {
    const prodDetails = props.route.params.details
    const parent = props.navigation.getParent()

    const [value, setValue] = useState(undefined)
    const [price, setPrice] = useState(0)
    const [pieces, setPieces] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)

    const api = useContext(ApiContext)
    const list = useContext(ListContext)
    const cart = useContext(CartContext)

    const shopNames = api.shops.map((item) => item.ShopName)

    const addProductHandler = (source) => {
        if (value === undefined) {
            setShowModal(true)
            return
        }

        const shop = prodDetails.Price.filter((data) => data.ShopID === api.shops[value - 1].ShopID)[0]
        prodDetails.Price[prodDetails.Price.indexOf(shop)].Price = price

        if (source === 'list') {
            list.addProduct({
                ...prodDetails,
                Pieces: pieces,
                ShopID: api.shops[value - 1].ShopID,
            })
            setShowSnackBar(true)
        } else if (source === 'cart') {
            cart.addProduct({
                ...prodDetails,
                Pieces: pieces,
                ShopID: api.shops[value - 1].ShopID,
            })
            setShowSnackBar(true)
        }
    }

    return (
        <>
            {showModal && (
                <Portal>
                    <Modal
                        visible={showModal}
                        onDismiss={() => {
                            setShowModal(false)
                        }}
                    >
                        <View style={styles.centerview}>
                            <Card style={styles.modalcard}>
                                <Card.Content>
                                    <View style={styles.centerview}>
                                        <Text variant="headlineSmall" style={styles.modaltext}>
                                            Válasszon egy boltot!
                                        </Text>
                                    </View>
                                </Card.Content>
                                <Card.Actions>
                                    <View style={styles.centercontainer}>
                                        <Button
                                            mode="outlined"
                                            onPress={() => {
                                                setShowModal(false)
                                            }}
                                        >
                                            Vissza
                                        </Button>
                                    </View>
                                </Card.Actions>
                            </Card>
                        </View>
                    </Modal>
                </Portal>
            )}

            <Snackbar
                visible={showSnackBar}
                duration={1000}
                onDismiss={() => {
                    setShowSnackBar(false)
                    parent.navigate('main')
                }}
                elevation={3}
                icon="check"
                onIconPress={() => {
                    setShowSnackBar(false)
                    parent.navigate('main')
                }}
                style={{ marginBottom: 20 }}
            >
                Sikeresen hozzáadva
            </Snackbar>

            <TopNavBar
                title={
                    <IconButton
                        icon="home"
                        size={40}
                        onPress={() => {
                            parent.navigate('main')
                        }}
                    />
                }
            />

            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.productcardimagebox}>
                        <Card.Cover source={{ uri: prodDetails.ImageLink }} style={styles.productimage} />
                        <Text variant="titleMedium" style={styles.productname}>
                            {prodDetails.Name}
                        </Text>
                    </View>
                    <Card.Actions>
                        <View style={styles.centercontainer}>
                            <Dropdown
                                placeholder="Válasszon egy boltot"
                                data={shopNames}
                                onSelect={(item) => {
                                    const shop = api.shops.find((element) => element.ShopName === item)
                                    setValue(shop.ShopID)
                                    setPrice(list.getShopPrice(prodDetails, shop.ShopID))
                                }}
                            />
                        </View>
                        <IconButton
                            icon="star-outline"
                            onPress={() => {
                                console.log('Kedvencekhez')
                            }}
                        />
                    </Card.Actions>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Actions>
                    <View style={styles.pricecardinputcontainer}>
                        <View style={styles.pricecardinputcontainerbox}>
                            <TextInput
                                mode="outlined"
                                editable
                                style={styles.priceinput}
                                value={price.toString()}
                                onChangeText={(inputPrice) => {
                                    setPrice(inputPrice)
                                }}
                                keyboardType="numeric"
                            />
                            <Text variant="titleMedium" style={styles.centerview}>
                                Ft/db
                            </Text>
                        </View>
                        <NumericInput
                            onChange={(value) => {
                                setPieces(value)
                            }}
                            value={pieces}
                            minValue={1}
                            maxValue={100}
                            rounded="true"
                        />
                    </View>
                    <View style={styles.pricecardbuttoncontainer}>
                        <View>
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    addProductHandler('list')
                                }}
                            >
                                Listára
                            </Button>
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    addProductHandler('cart')
                                }}
                            >
                                Kosárba
                            </Button>
                        </View>
                    </View>
                </Card.Actions>
            </Card>

            <View style={styles.centercontainer}>
                <Button
                    mode="contained"
                    style={styles.newbutton}
                    onPress={() => {
                        parent.replace('scan')
                    }}
                >
                    Új kód beolvasása
                </Button>
                <Button
                    mode="contained"
                    style={styles.mainpagebutton}
                    onPress={() => {
                        parent.navigate('main')
                    }}
                >
                    Vissza a főoldalra
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    centercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productcardimagebox: {
        flexDirection: 'row',
    },
    productimage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    productname: {
        flex: 1,
        verticalAlign: 'top',
        textAlign: 'justify',
    },
    pricecardinputcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '52%',
    },
    pricecardinputcontainerbox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceinput: {
        margin: 10,
        width: '80%',
        height: 60,
        fontSize: 30,
    },
    pricecardbuttoncontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    newbutton: {
        width: '50%',
        margin: 10,
    },
    button: {
        margin: 10,
    },
    card: {
        margin: 10,
        padding: 5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
        margin: 5,
        width: '100%',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    modalcard: {
        width: '90%',
        padding: 15,
    },
    modaltext: {
        textAlign: 'center',
        margin: 10,
    },
    mainpagebutton: {
        width: '50%',
        margin: 10,
    },
    dropdownBtnStyle: {
        height: 50,
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {
        color: '#444',
        textAlign: 'left',
    },
    dropdown1DropdownStyle: {
        backgroundColor: '#EFEFEF',
    },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
    },
    dropdown1RowTxtStyle: {
        color: '#444',
        textAlign: 'left',
    },
})

export default ProductScreen
