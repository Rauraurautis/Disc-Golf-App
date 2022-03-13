import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import {  useSelector } from "react-redux"
import axios from 'axios'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const mockData = {
    "icon": 'http://openweathermap.org/img/w/01d.png',
    "temperature": 0,
    "wind": 0,
}

export default function WeatherData() {
    const { userCoords } = useSelector(state => state.userReducer)
    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${userCoords.latitude}&lon=${userCoords.longitude}&units=metric&appid=665ecd56dfc08dbb50feb8b8f5034e28`)
            .then(res => res.data)
            .then(data => setWeatherData({ temperature: data.main.temp, wind: data.wind.speed, description: data.weather[0].description, icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png` }))
            .catch(error => setWeatherData(mockData))
    }, [userCoords]) 
  
    return (
        <View style={styles.container}>
            <View style={styles.dataInfo}><MaterialCommunityIcons name="temperature-celsius" size={24} color="#0043ff" /><Text style={{ ...styles.weatherinfo, paddingLeft: 5 }}>{weatherData.temperature}</Text></View>
            <View style={styles.dataInfo}><Feather name="wind" size={30} color="#eef0ff" /><Text style={{ ...styles.weatherinfo, marginBottom: 2 }}>{weatherData.wind} m/s</Text></View>
            <Image style={styles.weatherimg} source={{ uri: weatherData.icon }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "10%",
        position: "absolute",
        zIndex: 2,
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    weatherinfo:
    {
        fontWeight: "bold",
        fontSize: 15,
        color: "black"
    },
    weatherimg:
    {
        width: 70,
        height: 70,
    },
    dataInfo: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 15
    }
})
