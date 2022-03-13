import React, { useState } from 'react'
import Dialog from "react-native-dialog"
import { ScrollView, View, StyleSheet } from 'react-native'
import { db } from '../utils/FirebaseSetup'
import { push, ref, onValue, set } from 'firebase/database';

export default function CourseDialog({ addDialogVisible, setAddDialogVisible, courseDetails, setCourseDetails, toastRef }) {
    const [secondScreen, setSecondScreen] = useState(false)
    const [numberOfHoles, setNumberOfHoles] = useState(null)



    const saveCourse = () => {
        push(
            ref(db, 'Courses/'),
            { "name": courseDetails.name, "address": courseDetails.address, "coordinates": courseDetails.coordinates, "holes": Object.assign({}, courseDetails.holes) }
        )
        setCourseDetails({ holes: [] })
        setAddDialogVisible(false)
    }

    if (!secondScreen) {
        return (
            <Dialog.Container visible={addDialogVisible}>
                <Dialog.Title style={{ textAlign: "center" }}>New Course</Dialog.Title>
                <Dialog.Input placeholder="Course address" onChangeText={text => setCourseDetails({ ...courseDetails, address: text })} />
                <Dialog.Input placeholder="Course name" onChangeText={text => setCourseDetails({ ...courseDetails, name: text })} />
                <Dialog.Input placeholder="Number of holes" keyboardType='numeric' string={numberOfHoles} onChangeText={text => setNumberOfHoles(text)} />
                <Dialog.Button label="Cancel" onPress={() => setAddDialogVisible(false)} />
                <Dialog.Button label="Next" onPress={() => {
                    setSecondScreen(true)
                }} />
            </Dialog.Container>
        )
    }




    return (
        <View style={{height: "20%"}}>
        <Dialog.Container contentStyle={{maxHeight: 600}} visible={addDialogVisible}>
            <Dialog.Title style={{ textAlign: "center" }}>Assign par for each hole</Dialog.Title>
            <ScrollView>
                {Array.from({ length: parseInt(numberOfHoles) }, (_, i) => i + 1).map((hole) => {
                    return <Dialog.Input key={hole} style={styles.holeInput} placeholder={`Hole ${hole}`}
                        keyboardType="numeric" onChangeText={text => setCourseDetails({ ...courseDetails, holes: courseDetails.holes.concat(parseInt(text)) })} />
                })}
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <Dialog.Button label="Cancel" onPress={() => setAddDialogVisible(false)} />
                    <Dialog.Button label="Add course" onPress={() => {
                        toastRef.current.showToast()
                        saveCourse()
                    }} />
                </View>
            </ScrollView>
        </Dialog.Container>
        </View>

    )

}

const styles = StyleSheet.create({
    holeInput: {
        width: 55,
        alignSelf: "center",
        textAlign: "center"
    }

})