
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native'
import MapComponent from '../../components/MapComponent';
import { MaterialIcons } from '@expo/vector-icons';
import { setSelectedCourse } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';


export default function CourseSelection({ navigation }) {
  const [position, setPosition] = useState({ latitude: 60.2963679, longitude: 25.0382604, latitudeDelta: 0.2, longitudeDelta: 0.2 })
  const { selectedCourse, courses } = useSelector(state => state.courseReducer)
  const { userCoords } = useSelector(state => state.userReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSelectedCourse(null))
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
      <View style={{ ...styles.btnView, justifyContent: userCoords.latitude ? "space-between" : "flex-end" }}>
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
