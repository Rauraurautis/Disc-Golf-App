
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native'
import * as Location from 'expo-location';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../FirebaseSetup';
import MapComponent from '../utils/MapComponent';
import { MaterialIcons } from '@expo/vector-icons';
import { setSelectedCourse, setCourses } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';


export default function CourseSelection({ navigation }) {
  const [position, setPosition] = useState({ latitude: 60.2963679, longitude: 25.0382604, latitudeDelta: 0.2, longitudeDelta: 0.2 })
  const { selectedCourse, courses } = useSelector(state => state.courseReducer)
  const { userCoords } = useSelector(state => state.userReducer)
  const [currentPositionMarker, setCurrentPositionMarker] = useState(null)
  const dispatch = useDispatch()



  useEffect(() => {
    const itemsRef = ref(db, "Courses/")
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val()
      dispatch(setCourses(Object.values(data)))
    })
    setCurrentPositionMarker({ coordinates: userCoords })
  }, [])

  const setUserLocation = async () => {
    setPosition(userCoords);
    dispatch(setSelectedCourse(null))
  }


  const handleMarkerPress = (course) => {
    dispatch(setSelectedCourse(course))
    setPosition({ ...position, ...course.coordinates })
  }

  const mapPressEvent = () => {
    dispatch(setSelectedCourse(null))
  }

  const startRound = () => {
    navigation.navigate("RoundScreen")
  }

  return (
    <MapComponent styles={styles} handleMarkerPress={handleMarkerPress} courses={courses} position={position} mapPressEvent={mapPressEvent}>
      <View style={{...styles.btnView, justifyContent: userCoords.latitude ? "space-between" : "flex-end" }}>
      {userCoords.latitude && <TouchableOpacity style={styles.currentLocationBtn} onPress={() => setUserLocation()}><MaterialIcons name="my-location" size={24} color="black" /></TouchableOpacity>}
      {selectedCourse && <TouchableOpacity style={styles.startRoundBtn}><AntDesign name="checkcircle" size={24} color="black" onPress={() => startRound()} /></TouchableOpacity>}
      </View>
    </MapComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: 'center',
    flex: 1
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
    position: "absolute"

  },
  btnText: {
    fontSize: 28
  },
  btnView: {
    display: "flex",
    width: "97%",
    paddingBottom: 30,
    marginTop: "auto",
    flexDirection: "row"

  },
  currentLocationBtn: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 10
  },
  startRoundBtn: {
    backgroundColor: "green",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 10

  },
})
