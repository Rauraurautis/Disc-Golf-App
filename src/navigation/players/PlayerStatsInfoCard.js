import React from 'react'
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Dialog from "react-native-dialog"

export default function PlayerStatsInfoCard({ player, infoCardVisible, setInfoCardVisible }) {


    return (
        <View>
            <Dialog.Container visible={infoCardVisible}>
                <Dialog.Title style={styles.title}>{player.name}</Dialog.Title>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{`Total amount of throws`}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right>
                        <ListItem.Title>{player.throws}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{`Won rounds`}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right>
                        <ListItem.Title>{player.wonrounds}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{`Played rounds`}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right>
                        <ListItem.Title>{player.playedrounds}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{`Average score`}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right>
                        <ListItem.Title>{player.avgscore}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <View style={styles.buttons}>
                    <Dialog.Button label="Return" onPress={() => setInfoCardVisible(false)} />
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
        justifyContent: "space-between",
        flexDirection: "row",
        paddingBottom: 20,
        marginTop: 10,
        justifyContent: "center"
    }
})