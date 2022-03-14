import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import CourseDialog from './CourseDialog';
import CourseInfoCard from './CourseInfoCard';
import { MaterialIcons } from '@expo/vector-icons';
import MapComponent from '../../components/MapComponent';
import { useSelector } from 'react-redux';
import ToastMessage from '../../components/ToastMessage';



export default function Players({ navigation }) {
  const { userCoords } = useSelector(state => state.userReducer)
  const [position, setPosition] = useState({ latitude: 60.261815, longitude: 24.9807538, latitudeDelta: 0.3, longitudeDelta: 0.3 })
  const { courses } = useSelector(state => state.courseReducer)
  const [addDialogVisible, setAddDialogVisible] = useState(false)
  const [courseCardVisible, setCourseCardVisible] = useState(false)
  const [courseDetails, setCourseDetails] = useState({ holes: [] })

  const toastRef = useRef()

  const setUserLocation = async () => {
    setPosition(userCoords);
    setCourseDetails({ holes: [] })
  }

  const handleMarkerPress = (course) => {
    setCourseDetails(course)
    setCourseCardVisible(true)

  }

  const mapPressEvent = (e) => {
    setCourseDetails({ holes: [], coordinates: e.nativeEvent.coordinate })
    setPosition({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, latitudeDelta: 0.10, longitudeDelta: 0.10 })
  }

 

  return (
    <>
      <ToastMessage ref={toastRef} message="A new course has been added!" />
      {addDialogVisible && <CourseDialog toastRef={toastRef} addDialogVisible={addDialogVisible} setAddDialogVisible={setAddDialogVisible} courseDetails={courseDetails} setCourseDetails={setCourseDetails} />}
      {courseCardVisible && <CourseInfoCard courseDetails={courseDetails} courseCardVisible={courseCardVisible} setCourseCardVisible={setCourseCardVisible} />}
      <MapComponent styles={styles} handleMarkerPress={handleMarkerPress} courses={courses} position={position} courseDetails={courseDetails} mapPressEvent={mapPressEvent}>
        <View style={{ ...styles.btnView, justifyContent: userCoords.latitude ? "space-between" : "flex-end" }}>
          {userCoords.latitude && <TouchableOpacity style={styles.currentLocationBtn} onPress={() => setUserLocation()}><MaterialIcons name="my-location" size={24} color="black" /></TouchableOpacity>}
          {courseDetails.coordinates && <TouchableOpacity style={styles.newCourseBtn} onPress={() => setAddDialogVisible(true)}><Text style={{ fontSize: 35 }}>+</Text></TouchableOpacity>}
        </View>
      </MapComponent>
    </>
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
    flexDirection: "row",
    justifyContent: "space-between"
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
  newCourseBtn: {
    backgroundColor: "green",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 10,

  },
})