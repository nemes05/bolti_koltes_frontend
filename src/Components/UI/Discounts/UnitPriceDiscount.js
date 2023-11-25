import { useContext, useState } from 'react'
import { View } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import { Button, Card, Text, TextInput, IconButton } from 'react-native-paper'

import ListContext from '../../../Contexts/list/list-context'
import TopNavBar from '../../Navigation/TopNavBar'
import Dropdown from '../Dropdown'

const UnitPriceDiscount = ({ navigation, onBackPress }) => {
    const list = useContext(ListContext)
    const [quantity, setQuantity] = useState(3)
    const [percent, setPercent] = useState(10)
    const [product, setProduct] = useState(undefined)

    const products = []
    list.list.forEach((item) => {
        if (!item.InCart) products.push(item.Name)
    })

    const setDiscountHandler = () => {
        const index = list.list.findIndex((item) => item.Name === product)
        const Barcode = list.list[index].Barcode

        list.addDiscount(list.list[index], Barcode, {
            DiscountID: 1,
            Name: 'Egységár kedvezmény',
            Quantity: quantity,
            Percent: percent,
        })
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

            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '80%',
                    margin: 10,
                }}
            >
                <Card>
                    <Card.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <NumericInput
                                rounded="true"
                                onChange={(value) => {
                                    setQuantity(value)
                                }}
                                value={quantity}
                                minValue={1}
                                maxValue={100}
                            />
                            <Text variant="labelLarge"> db felett </Text>
                            <TextInput
                                style={{ height: 45 }}
                                mode="outlined"
                                value={percent.toString()}
                                keyboardType="numeric"
                                onChangeText={(number) => {
                                    if (number >= 0 && number <= 100) setPercent(+number)
                                }}
                            />
                            <Text variant="labelLarge"> %-al olcsóbb.</Text>
                        </View>
                        <View>
                            <Dropdown
                                data={products}
                                onSelect={(item) => {
                                    setProduct(item)
                                }}
                            />
                        </View>
                        <View style={{ width: '60%' }}>
                            <Button mode="contained" onPress={setDiscountHandler}>
                                Hozzáadás
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
                <Button mode="contained" onPress={onBackPress}>
                    Vissza
                </Button>
            </View>
        </>
    )
}

export default UnitPriceDiscount
