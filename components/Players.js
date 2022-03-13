import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, ListItem } from 'react-native-elements'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import * as SQLite from "expo-sqlite";
import Dialog from "react-native-dialog";
import PlayerStatsInfoCard from './PlayerStatsInfoCard';
import ToastMessage from './utils/ToastMessage';

const db = SQLite.openDatabase("players.db")

export default function Players({ navigation }) {
    const [player, setPlayer] = useState({ name: "" });
    const [playerHandled, setPlayerHandled] = useState({})
    const [playerList, setPlayerList] = useState([]);
    const [dialogVisibility, setDialogVisibility] = useState(false)
    const [infoCardVisible, setInfoCardVisible] = useState(false)

    const toastRef = useRef()

    useEffect(() => {
        createTable()
        updatePlayers()
    }, [])

    //database functions

    const updatePlayers = () => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Player", [], (trans, result) => {
                setPlayerList(result.rows._array)
            })
        })
    }

    const getSinglePlayer = (id) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Player WHERE id = ?", [id], (trans, result) => {
                setPlayerHandled({ ...player, name: result.rows._array[0].name, id: id })
            })
        })
    }

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Player (id integer primary key not null, name text, throws integer default 0, avgscore real default 0.0, wonrounds integer default 0, playedrounds integer default 0);")
        })
    }

    const savePlayer = (player) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO Player (name) VALUES (?)', [player]);
        }, error => console.error(error), updatePlayers)
    }

    const deletePlayer = (id) => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM Player WHERE id = ?;", [id], updatePlayers)
        })
        setDialogVisibility(false)
    }


    const addPlayer = () => {
        savePlayer(player.name)
        setPlayer({ name: "" })
    }

    //database functions end

    const showPlayerStats = (player) => {
        setInfoCardVisible(true)
        setPlayerHandled(player)
    }


    const playerRender = ({ item }) => {
        return <ListItem containerStyle={{backgroundColor: "#EBEEFA"}} bottomDivider onLongPress={() => {
            getSinglePlayer(item.id)
            setDialogVisibility(true)
        }} onPress={() => showPlayerStats(item)}>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
                <ListItem.Chevron />
            </ListItem.Content>
        </ListItem>
    }



    return (
        <View>
            <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.background}>
                <PlayerStatsInfoCard player={playerHandled} infoCardVisible={infoCardVisible} setInfoCardVisible={setInfoCardVisible} />
                <View>
                    <Dialog.Container visible={dialogVisibility}>
                        <Dialog.Title>Player Deletion</Dialog.Title>
                        <Dialog.Description>
                            Are you sure you wish to delete {playerHandled.name}?
                        </Dialog.Description>
                        <Dialog.Button label="Cancel" onPress={() => setDialogVisibility(false)} />
                        <Dialog.Button label="Delete" onPress={() => {
                            deletePlayer(playerHandled.id)
                            toastRef.current.showToast()}} />
                    </Dialog.Container>
                </View>
                <View style={styles.inputs}>
                <ToastMessage ref={toastRef} message={`${playerHandled.name} deleted!`}/>
                    <Input labelStyle={{color: "#00000", paddingBottom: 5}} inputStyle={{ "backgroundColor": "white", padding: 5 }} placeholder="Enter a new player's name" label="Name" onChangeText={text => setPlayer({ name: text })} value={player.name}></Input>
                    <TouchableOpacity style={styles.saveBtn} onPress={() => addPlayer(player)}><Text style={{ color: "white", fontSize: 20}}>Save player</Text></TouchableOpacity>
                </View>
                
                <View style={{ flex: 2, width: "95%", marginTop: 10 }}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={playerList}
                        renderItem={playerRender} />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: 'center',
    },
    addPlayerBtn: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#5B7AA4",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "auto",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19
    },
    inputs: {
        width: "100%",
        color: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    saveBtn: {
        width: 200,
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#5B7AA4",
        justifyContent: "center",
        marginBottom: 10
    }
})