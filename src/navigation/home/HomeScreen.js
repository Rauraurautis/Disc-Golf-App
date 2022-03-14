import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import WeatherData from '../../components/WeatherData';
import { setCourses, setPlayers, setUserCoords, setLanguage } from '../../redux/actions';
import { db as coursesDb } from '../../utils/FirebaseSetup';
import { db as sqliteDb } from '../../utils/SQLiteSetup';
import { ref, onValue } from 'firebase/database';

export default function HomeScreen({ navigation }) {
  const { language } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  //Sets all courses
  useEffect(() => {
    const coursesRef = ref(coursesDb, "Courses/")
    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        dispatch(setCourses(Object.values(data)))
      }
    })
  }, [])

  //Sets all players

  useEffect(() => {
    sqliteDb.transaction(tx => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS Player (id integer primary key not null, name text, throws integer default 0, avgscore real default 0.0, wonrounds integer default 0, playedrounds integer default 0);")
    })

    sqliteDb.transaction(tx => {
      tx.executeSql("SELECT * FROM Player", [], (trans, result) => {
        dispatch(setPlayers(result.rows._array))
      })
    })
  }, [])

  //Sets user coordinates

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
      <ImageBackground source={require('../../assets/background.jpg')} resizeMode="cover" style={styles.background}>
        <View style={{ flex: 2, flexDirection: "column" }}>
          <TouchableOpacity onPress={() => navigation.navigate("PlayerSelection")} style={styles.startRoundBtn}>
            <Text style={styles.startRoundBtnText}>Start Round</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => dispatch(language === "english" ? setLanguage("finnish") : setLanguage("english"))}><Text style={styles.btnText}>{language}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("RoundHistory")}><Text style={styles.btnText}>{language === "english" ? "Round history" : "Kierroshistoria"}</Text></TouchableOpacity>
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