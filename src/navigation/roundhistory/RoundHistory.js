import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, ImageBackground, StyleSheet } from 'react-native'
import { Input, ListItem } from 'react-native-elements'
import { db } from '../../utils/FirebaseSetup'
import { ref, onValue } from 'firebase/database'
import RoundHistoryInfoCard from './RoundHistoryInfoCard'

export default function RoundHistory() {
    const [rounds, setRounds] = useState([])
    const [roundHandled, setRoundHandled] = useState({})
    const [roundCardVisible, setRoundCardVisible] = useState(false)
    const [searchedRounds, setSearchedRounds] = useState([])

    useEffect(() => {
        const coursesRef = ref(db, "Results/")
        onValue(coursesRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                setRounds(Object.values(data))
                setSearchedRounds(Object.values(data))
            }
        })
    }, [])

    const handleRoundClick = (round) => {
        setRoundHandled(round)
        setRoundCardVisible(true)
    }

    const roundRender = ({ item }) => {
        return <ListItem bottomDivider containerStyle={{ width: "97%", alignSelf: "center", backgroundColor: "#EBEEFA" }} onPress={() => handleRoundClick(item)}>
            <ListItem.Content>
                <ListItem.Title><Text style={{ fontWeight: "bold" }}>{item.course}</Text></ListItem.Title>
            </ListItem.Content>
            <ListItem.Content>
                <ListItem.Title>{new Date(item.date).toString().substring(4, 24)}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
                <ListItem.Title>Players: {item.players.length}</ListItem.Title>
            </ListItem.Content>
        </ListItem>

    }


    return (
        <View>
            <ImageBackground source={require('../../assets/background.jpg')} resizeMode="cover" style={styles.background}>
                <View style={{ width: "100%" }}>
                    <RoundHistoryInfoCard round={roundHandled} roundCardVisible={roundCardVisible} setRoundCardVisible={setRoundCardVisible} />
                    <Input labelStyle={{ color: "black", paddingBottom: 5 }} inputStyle={{ "backgroundColor": "white", padding: 5 }} placeholder="Search for rounds by course" label="Course search" onChangeText={text => {
                        const searchRegex = new RegExp(text, "gi")
                        setSearchedRounds(rounds.filter(round => round.course.match(searchRegex)))
                    }
                    } />
                    <View>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={searchedRounds}
                            renderItem={roundRender} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
        width: "100%",
    }
})
