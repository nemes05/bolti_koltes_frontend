import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

const TopNavBar = (props) => {
    return (
        <Appbar.Header elevated style={{ marginBottom: 5, marginTop: 5 }}>
            <Appbar.Action icon="menu" size={35} />
            <Appbar.Content title={props.title} style={styles.title} />
            <Appbar.Action icon="account-circle" size={35} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
    },
})

export default TopNavBar
