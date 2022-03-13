import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers, setCourse } from './redux/actions';
import { setUserCoords } from './redux/actions';
import * as SQLite from "expo-sqlite";
import WeatherData from './utils/WeatherData';


const db = SQLite.openDatabase("players.db")

export default function HomeScreen({ navigation }) {
  const { userCoords } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() =>
    (async function () {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
      dispatch(setUserCoords({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.10, longitudeDelta: 0.10 }));
    })()
    , [])



  return (
    <View style={styles.container}>
      <WeatherData />
      <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.background}>
        <View style={{ flex: 2, flexDirection: "column" }}>
          <TouchableOpacity onPress={() => navigation.navigate("PlayerSelection")} style={styles.startRoundBtn}>
            <Text style={styles.startRoundBtnText}>Start Round</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("RoundHistory")}><Text style={styles.btnText}>Round history</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Courses")}><Text style={styles.btnText}>Courses</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Players")}><Text style={styles.btnText}>Players</Text></TouchableOpacity>
        </View>
      </ImageBackground >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: 'center',
  },
  startRoundBtn: {
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
    elevation: 19,
    marginBottom: 60
  },
  startRoundBtnText: {
    fontSize: 26
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "flex-end"
  },
  btn: {
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A4855B",
    borderRadius: 50,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19

  },
  btnText: {
    color: "#fff",
    fontSize: 20
  }
});