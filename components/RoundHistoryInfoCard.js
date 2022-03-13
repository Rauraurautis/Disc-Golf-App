import React from 'react'
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import Dialog from "react-native-dialog"

export default function RoundHistoryInfoCard({ round, roundCardVisible, setRoundCardVisible }) {

    const playerRender = ({ item }, i) => {
        return <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
                <ListItem.Title>Score: {item.roundScore}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    }


    return (
        <View>
            <Dialog.Container contentStyle={{maxHeight: 600}} visible={roundCardVisible}>
                <Dialog.Title style={styles.title}>{round.course}</Dialog.Title>
                <View style={{height: "50%"}}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={round.players}
                        renderItem={playerRender} />
                </View>
                <View style={styles.buttons}>
                    <Dialog.Button label="Return" onPress={() => setRoundCardVisible(false)} />
                </View>
            </Dialog.Container >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: 'center'
    },
    title: {
        textAlign: "center"
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 0
    },
    listcontainer: {
        maxHeight: "40%"
    }
})