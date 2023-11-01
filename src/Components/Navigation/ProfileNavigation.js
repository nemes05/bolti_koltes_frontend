import { Pressable, StyleSheet } from 'react-native'
import { Divider, Text, useTheme } from 'react-native-paper'

import Drawer from '../UI/Drawer'

const ProfileNavigation = ({ navigation, visible, hide, position }) => {
    const theme = useTheme()

    const navigationItem = (screen) => {
        return (
            <Pressable
                style={({ pressed }) => [
                    { backgroundColor: pressed ? theme.colors.secondaryContainer : undefined, borderRadius: 10 },
                ]}
                onPress={() => {
                    hide()
                    navigation.navigate('usernavigation', { screen })
                }}
            >
                <Text variant="bodyLarge" style={styles.text}>
                    {screen === 'login' ? 'Bejelentkezés' : 'Regisztráció'}
                </Text>
            </Pressable>
        )
    }

    return (
        <Drawer
            visible={visible}
            position={position}
            hide={() => {
                hide()
            }}
        >
            <Text variant="headlineSmall">Profil</Text>
            <Divider style={styles.divired} bold />
            {navigationItem('login')}
            {navigationItem('register')}
        </Drawer>
    )
}

const styles = StyleSheet.create({
    divired: {
        marginBottom: 5,
        marginTop: 5,
    },
    text: {
        margin: 10,
    },
})

export default ProfileNavigation
