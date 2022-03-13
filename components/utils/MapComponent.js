import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types"


export default function MapComponent({ styles, children, handleMarkerPress, mapPressEvent, courseDetails, courses, position }) {
    const [currentPositionMarker, setCurrentPositionMarker] = useState([])
    const { userCoords } = useSelector(state => state.userReducer)

    useEffect(() => {
        setCurrentPositionMarker({ coordinates: userCoords })
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                onPress={(e) => {
                    mapPressEvent(e)
                }}
                style={styles.map}
                region={position}
            >
                {courseDetails.coordinates && <Marker coordinate={courseDetails.coordinates}></Marker>}
                {courses.map((course, i) => {
                    return <Marker onPress={() => handleMarkerPress(course)} coordinate={course.coordinates} key={i} title={course.address} description={`Holes: ${Object.keys(course.holes).length}`}>
                        <Image source={require("./basket.png")} style={{ height: 35, width: 35 }} />
                    </Marker>
                })}
                {currentPositionMarker && <Marker coordinate={currentPositionMarker.coordinates}><Ionicons name="person" size={40} color="green" /></Marker>}
            </MapView>
            {children}
        </View>
    )
}

MapComponent.propTypes = {
    mapPressEvent: PropTypes.func
}

MapComponent.defaultProps = {
    mapPressEvent: () => { },
    courseDetails: {
        holes: []
    }
}