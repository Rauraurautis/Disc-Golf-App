import React, { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Dialog from "react-native-dialog"
import * as SQLite from "expo-sqlite";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setSelectedPlayers, setPlayers } from '../../redux/actions';
import { db as firebaseDb } from '../../utils/FirebaseSetup';
import { db as sqliteDb } from '../../utils/SQLiteSetup';
import { push, ref, serverTimestamp } from 'firebase/database';

export default function Scoreboard({ players, scoreboardVisible, setScoreboardVisible, round, isRoundOver, navigation, textLanguage }) {
    const [dialogVisibility, setDialogVisibility] = useState()
    const dispatch = useDispatch()

    const sortPlayersByScores = () => {
        return players.sort((a, b) => a.roundScore - b.roundScore)
    }

    const checkIndexForTrophy = (player) => {
        if (!isRoundOver()) {
            switch (players.indexOf(player)) {
                case 0:
                    return "gold"
                case 1:
                    return "silver"
                case 2:
                    return "#CD7F32"
                default:
                    return null
            }
        }
    }

    const finishRound = () => {
        const db = SQLite.openDatabase("players.db")
        sortPlayersByScores().forEach((player, i) => {
            let playerRoundsWon = player.wonrounds
            if (i === 0) {
                playerRoundsWon = player.wonrounds + 1
            }
            let playerRoundsPlayed = player.playedrounds + 1
            let playerAvgScore = ((player.avgscore + player.roundAvgScore) / playerRoundsPlayed).toFixed(2)
            let playerThrows = player.throws + player.roundScore
            console.log(player.avgscore + " " + player.roundAvgScore + " " + playerRoundsPlayed)
            db.transaction(tx => {
                tx.executeSql(`UPDATE Player SET throws = ${playerThrows}, avgscore = ${playerAvgScore}, wonrounds = ${playerRoundsWon}, playedrounds = ${playerRoundsPlayed} WHERE id = ${player.id}`),
                    [playerThrows, playerAvgScore, playerRoundsWon, playerRoundsPlayed], () => { }, error => console.error(error)
            })
        })
        dispatch(setSelectedPlayers([]))
        setDialogVisibility(true)
    }

    const uploadToCloud = () => {
        push(ref(firebaseDb, "Results/"),
            { "players": players.map(p => { return { name: p.name, roundAvgScore: p.roundAvgScore, roundScore: p.roundScore } }), course: round.name, date: serverTimestamp() }
        )
        sqliteDb.transaction(tx => {
            tx.executeSql("SELECT * FROM Player", [], (trans, result) => {
                dispatch(setPlayers(result.rows._array))
            })
        })
        navigation.navigate("Home")
    }


    const playerRender = ({ item }) => {
        return <ListItem bottomDivider>
            <ListItem.Content style={{ flexDirection: "row" }}>
                {checkIndexForTrophy(item) && <FontAwesome name="trophy" size={24} color={checkIndexForTrophy(item)} style={{ alignSelf: "flex-start" }} />}<ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content center>
                <ListItem.Title>Total throws: {item.roundScore}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
                <ListItem.Title>{item.roundScore - round.roundStatus.currentTotalPar}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    }


    return (
        <View>
            <View>
                <Dialog.Container visible={dialogVisibility}>
                    <Dialog.Title>{textLanguage.cloudMsg}</Dialog.Title>
                    <Dialog.Description>
                    {textLanguage.cloudMsgDescription}
                    </Dialog.Description>
                    <Dialog.Button label={textLanguage.cloudMsgNegative} onPress={() => {
                        setDialogVisibility(false)
                        navigation.navigate("Home")
                    }} />
                    <Dialog.Button label={textLanguage.cloudPositive}onPress={() => uploadToCloud()} />
                </Dialog.Container>
            </View>
            <Dialog.Container visible={scoreboardVisible}>
                <Dialog.Title style={styles.title}>{textLanguage.scoreboard}</Dialog.Title>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={sortPlayersByScores()}
                    renderItem={playerRender} />
                <View style={styles.buttons}>
                    {isRoundOver() && <Dialog.Button label={textLanguage.return} onPress={() => setScoreboardVisible(false)} />}
                    {isRoundOver() === undefined && <Dialog.Button label={textLanguage.finish} onPress={() => finishRound()} />}
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