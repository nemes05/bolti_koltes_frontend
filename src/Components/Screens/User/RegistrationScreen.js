import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, TextInput, useTheme, Text, Button, Portal, Modal } from 'react-native-paper'

const RegistrationScreen = ({ navigation }) => {
    const parent = navigation.getParent()

    const [email, setEmail] = useState()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [passwordAgain, setPasswordAgain] = useState()
    const [error, setError] = useState({ err: false, msg: '' })

    const theme = useTheme()

    const validatePassword = (password, passwordAgain) => {
        return password === passwordAgain
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const submit = () => {
        if (!validateEmail(email)) {
            setError({ err: true, msg: 'Nem megfelelő az e-mail cím!' })
        } else if (!validatePassword(password, passwordAgain)) {
            setError({ err: true, msg: 'A két jelszó nem egyezik meg!' })
        }

        const obj = {
            email,
            userName,
            password,
            passwordAgain,
        }

        console.log(obj)
    }

    return (
        <>
            <Portal>
                <Modal
                    visible={error.err}
                    onDismiss={() => {
                        setError({ err: false, msg: '' })
                    }}
                >
                    <View style={styles.modalcardcontainer}>
                        <Card style={styles.modalcard}>
                            <Card.Content>
                                <Text style={styles.cardtext} variant="headlineSmall">
                                    {error.msg}
                                </Text>
                            </Card.Content>
                            <Card.Actions>
                                <View style={styles.actioncontainer}>
                                    <Button
                                        style={styles.modalbutton}
                                        mode="outlined"
                                        onPress={() => {
                                            setError({ err: false, msg: '' })
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

            <View style={styles.cardcontainer}>
                <Card style={{ ...styles.card, backgroundColor: theme.colors.secondaryContainer }}>
                    <Card.Content style={styles.cardcontent}>
                        <Text variant="headlineSmall">Fiók létrehozása</Text>
                        <TextInput
                            mode="outlined"
                            label="E-mail"
                            autoComplete="email"
                            keyboardType="email-address"
                            onChangeText={(value) => setEmail(value)}
                        />
                        <TextInput
                            mode="outlined"
                            label="Felhasználónév"
                            onChangeText={(value) => setUserName(value)}
                        />
                        <TextInput
                            mode="outlined"
                            label="Jelszó"
                            secureTextEntry
                            onChangeText={(value) => setPassword(value)}
                        />
                        <TextInput
                            mode="outlined"
                            label="Jelszó mégegyszer"
                            secureTextEntry
                            onChangeText={(value) => setPasswordAgain(value)}
                        />
                        <Button
                            style={styles.button}
                            mode="contained"
                            onPress={() => {
                                submit()
                            }}
                        >
                            Regisztrálok!
                        </Button>
                        <Button
                            onPress={() => {
                                parent.navigate('main')
                            }}
                        >
                            Ugrás az appba regisztráció nélkül!
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    modalcardcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalcard: {
        width: '90%',
        padding: 15,
    },
    cardtext: {
        textAlign: 'center',
        margin: 10,
    },
    actioncontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalbutton: {
        margin: 10,
    },
    cardcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    card: {
        width: '90%',
        padding: 10,
    },
    cardcontent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    button: {
        marginTop: 10,
    },
})

export default RegistrationScreen