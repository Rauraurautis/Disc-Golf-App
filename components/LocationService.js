import * as Location from 'expo-location';

const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        return null
    }
    let location = await Location.getCurrentPositionAsync()
    return { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
}

export { getUserLocation }