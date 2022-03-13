import React from 'react'
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import Dialog from "react-native-dialog"

export default function CourseInfoCard({ courseDetails, courseCardVisible, setCourseCardVisible }) {

    const holeRender = ({ item }, i) => {
        return <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{`Hole ${item.hole}`}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
                <ListItem.Title>{`Par ${item.par}`}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    }


    return (
        <View>
            <Dialog.Container visible={courseCardVisible}>
                <Dialog.Title style={styles.title}>{courseDetails.name}</Dialog.Title>
                <Dialog.Description style={{textAlign: "center"}}>{`Address: ${courseDetails.address}`}</Dialog.Description>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={courseDetails.holes.map((c, i) => { return { hole: i + 1, par: c } })}
                    renderItem={holeRender} />
                <View style={styles.buttons}>
                    <Dialog.Button bold={true} label="Return" onPress={() => setCourseCardVisible(false)} />
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
        flexDirection: "row"
    }
})