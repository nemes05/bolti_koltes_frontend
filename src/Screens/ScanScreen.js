import { BarCodeScanner } from 'expo-barcode-scanner'
import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

import TopNavBar from '../Navigation/TopNavBar'

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }
        getBarCodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        console.log(
            `Bar code with type ${type} and data ${data} has been scanned!`
        )
    }

    if (hasPermission === null) {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                    padding: 20,
                }}
            >
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }
    if (hasPermission === false) {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                    padding: 20,
                }}
            >
                <Text>No access for camera</Text>
            </View>
        )
    }

    return (
        <>
            <TopNavBar />
            <View style={styles.container}>
                <View style={styles.barcodebox}>
                    <BarCodeScanner
                        onBarCodeScanned={
                            scanned ? undefined : handleBarCodeScanned
                        }
                        style={{ height: 600, width: 400 }}
                    />
                </View>
                <View style={{ padding: 20 }} />
                {scanned && (
                    <Button
                        mode="contained"
                        onPress={() => setScanned(false)}
                        style={{ width: 200 }}
                        uppercase
                    >
                        Scan again
                    </Button>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
    },
})

export default ScanScreen
