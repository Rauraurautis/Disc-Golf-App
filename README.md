# Disc Golf App

## Overview
This is a React Native-based project for Mobiiliohjelmointi-course at Haaga-Helia, built using the Expo framework and platform.

**LIVE LINK:** https://expo.dev/@rauraurautis/DiscGolfApp (scan the QR-code using Expo app on your mobile device)

## Features
This app is a simple score-tracking application for disc golf. The user can save players locally and browse as well as add courses which are cloud-based. The user can also of course start a round and use the app for tracking their and their friends' scores. After completing a round players get an option to upload the round to the cloud. Users may view uploaded rounds in the round history screen. The app also tracks data such as average score as well as won rounds, which can be viewed in the players-screen.

## Technologies and libraries used
For routing and navigation the app uses [react-navigation](https://reactnavigation.org/).

For saving data, the application uses [Firebase](https://firebase.google.com/) for cloud storage as well as [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) for local data storage.

[Redux](https://redux.js.org/) is used to manage state throughout the application.

Thanks goes to [OpenWeatherMap](https://openweathermap.org/) for providing an API for weather data. The application fetches data from the API using [Axios](https://www.npmjs.com/package/axios). [Expo-location](https://docs.expo.dev/versions/latest/sdk/location/) is used in order to obtain user's coordinates for weather data.

[React-native-maps](https://www.npmjs.com/package/react-native-maps) is used to display a map, which is an integral part of the application.

For different utilities such as dialogs, cards and toasts, [react-native-dialog](https://www.npmjs.com/package/react-native-dialog), [react-native-elements](https://reactnativeelements.com/) and [react-native-toast-message](https://www.npmjs.com/package/react-native-toast-message) are used.



