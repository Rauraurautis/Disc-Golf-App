
import React, { useState, useEffect, useRef } from 'react'
import { ListItem } from 'react-native-elements'
import { View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import * as SQLite from "expo-sqlite";
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayers, setSelectedPlayers } from "../redux/actions"
import ToastMessage from '../utils/ToastMessage';


const db = SQLite.openDatabase("players.db")

export default function PlayerSelection({ navigation }) {
    const { selectedPlayers, players } = useSelector((state) => state.playerReducer)
    const [toastActive, setToastActive] = useState(false)
    const dispatch = useDispatch()

    const toastRef = useRef()

    useEffect(async () => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Player", [], (trans, result) => {
                dispatch(setPlayers(result.rows._array))
            })
        })
    }, [])


    const handleListItemPress = (player) => {
        const filteredPlayers = selectedPlayers.filter(p => player.id === p.id)
        if (filteredPlayers.length > 0) {
            dispatch(setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id)))
            return
        }
        if (selectedPlayers.length === 5) {
            Alert.alert("Max amount of players is 5!")
            return
        }
        dispatch(setSelectedPlayers(selectedPlayers.concat(player)))
    }

    const handleNextScreen = () => {
        if (selectedPlayers.length === 0) {
            toastRef.current.showToast()
            setToastActive(true)
            setTimeout(() => {
                setToastActive(false)
            }, 2000)
            return
        }
        navigation.navigate("CourseSelection")
    }

    const playerRender = ({ item }) => {
        return <ListItem onPress={() => handleListItemPress(item)} bottomDivider containerStyle={selectedPlayers.filter((player) => player.id === item.id).length > 0 ? { backgroundColor: "#B2FF66" } : { backgroundColor: "white" }}>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
            </ListItem.Content>
        </ListItem>
    }

    return (
        <View style={StyleSheet.container}>
            <View style={{ position: "absolute", height: toastActive ? "20%" : "0%", width: "100%", zIndex: 2, pointerEvents: "none" }}>
                <ToastMessage ref={toastRef} message={"You need to choose at least one player!"} />
            </View>
            <View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={players}
                    renderItem={playerRender} />
                <TouchableOpacity style={styles.nextBtn} onPress={() => handleNextScreen()}><Entypo name="arrow-bold-right" size={24} color="black" /></TouchableOpacity>
            </View>
            <View style={{ marginBottom: 0, backgroundColor: "grey" }}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "green"
    },
    nextBtn: {
        backgroundColor: "green",
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        marginTop: "auto",
        borderRadius: 30,
        marginTop: 10,
        marginRight: 10
    },
    btnContainer: {
        display: "flex",
        width: "97%",
        height: 80,
        paddingBottom: 30,
        marginTop: "auto",
        position: "absolute",
        marginTop: "auto",
        justifyContent: "space-between"
    }
})
