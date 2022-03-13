import React, { useRef, useState } from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native"
import { Input, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux'
import Scoreboard from './Scoreboard';
import ToastMessage, { toastRef } from '../../components/ToastMessage';

export default function RoundScreen({ navigation, route }) {
    const [scoreboardVisible, setScoreboardVisible] = useState(false)

    const { selectedPlayers } = useSelector(state => state.playerReducer)
    const { selectedCourse, courses } = useSelector(state => state.courseReducer)
    const [round, setRound] = useState({ ...selectedCourse, roundStatus: { hole: 1, currentTotalPar: 0 } })
    const [players, setPlayers] = useState(selectedPlayers.map(p => { return { ...p, roundScore: 0, roundAvgScore: 0 } }))
    const [scoreInputs, setScoreInputs] = useState(selectedPlayers.map(p => { return { id: p.id, score: "" } }))

    const toastRef = useRef()

    const handleNextHole = () => {
        if (scoreInputs.filter(ip => ip.score === "").length > 0) {
            toastRef.current.showToast()
            return
        }

        //Kierroksen kokonaismääräistä par-tulosta asetetaan tässä. Hyödynnetään Scoreboard-komponentissa pelaajien heittojen kokonaismäärän ja par-tuloksen keskenäisessä vertailussa
        setRound({ ...round, roundStatus: { ...round.roundStatus, currentTotalPar: (round.roundStatus.currentTotalPar += round.holes[round.roundStatus.hole - 1]) } })

        //Käy jokaisen pelaajan läpi ja asettaa heille määrätyt pisteet

        scoreInputs.forEach(ip => {
            setPlayers(players.map(p => {
                if (p.id === ip.id) {
                    console.log(round.roundStatus.currentTotalPar + " " + round.roundStatus.hole)
                    return { ...p, roundScore: p.roundScore += ip.score, roundAvgScore: ((ip.score - round.holes[round.roundStatus.hole - 1]) + p.roundAvgScore) / round.roundStatus.hole }
                } else {
                    return p
                }
            }))
        })

        //Nollaa scoreinputit jotta inputit tyhjenee
        setScoreInputs(scoreInputs.map(ip => {
            return { id: ip.id, score: "" }
        }))

        if (isRoundOver() === undefined) {
            setScoreboardVisible(true)
            return
        }

        //Määrätään seuraava "reikä"
        setRound({ ...round, holes: round.holes, roundStatus: { ...round.roundStatus, hole: round.roundStatus.hole + 1 } })
    }

    const handleScoreChange = (id, score) => {
        let newScoreInput = { id: id, score: score }
        setScoreInputs(scoreInputs.filter(ip => ip.id !== id).concat(newScoreInput))
    }

    //Apufunktio, tarkistaa onko kierros ohi. Palauttaa undefined jos on
    const isRoundOver = () => {
        return round.holes[round.roundStatus.hole]
    }

    return (
        <View style={styles.container}>
            <ToastMessage ref={toastRef} message={"You need to enter scores for all players!"} />
            <Scoreboard scoreboardVisible={scoreboardVisible} setScoreboardVisible={setScoreboardVisible} players={players} round={round} isRoundOver={isRoundOver} navigation={navigation} />
            <Text style={styles.holeinfo}>{`Hole ${round.roundStatus.hole}`}</Text>
            <Text style={styles.parinfo}>{`Par ${round.holes[round.roundStatus.hole - 1]}`}</Text>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={selectedPlayers}
                renderItem={({ item }) => (<Input textAlign="center" labelStyle={styles.scoreLabel} inputContainerStyle={styles.scoreInput} label={item.name} keyboardType="numeric"
                    value={"" + scoreInputs.filter(ip => ip.id === item.id)[0].score} onChangeText={text => handleScoreChange(item.id, isNaN(parseInt(text)) ? "" : parseInt(text))} />)} />
            <View style={{ ...styles.btnContainer, justifyContent: isRoundOver() !== undefined ? "space-between" : "flex-end" }}>
                {isRoundOver() !== undefined ? <TouchableOpacity style={{ ...styles.btn, marginLeft: 10 }} onPress={() => setScoreboardVisible(true)}>
                    <Text style={{ fontSize: 25 }}>Scoreboard</Text>
                </TouchableOpacity> : null}
                <TouchableOpacity style={{ ...styles.btn, marginRight: 10 }} onPress={() => handleNextHole()}>
                    <Text style={{ fontSize: 25 }}>{isRoundOver() === undefined ? "Results" : "Next hole"}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flex: 1,
    },
    holeinfo:
    {
        textAlign: "center",
        fontSize: 35,
        paddingBottom: 15
    },
    parinfo:
    {
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 25
    },
    btn: {
        alignSelf: "center",
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f19d48",
        marginBottom: 25,
        borderRadius: 20
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    errorToast: {
        width: "80%",
        height: 50,
        backgroundColor: "white",
        position: "absolute",
        zIndex: 2
    },
    scoreInput: {
        width: "20%",
        alignSelf: "center",
        textAlign: "center"
    },
    scoreLabel: {
        color: "black",
        alignSelf: "center"
    }
})
