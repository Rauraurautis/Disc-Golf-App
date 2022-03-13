import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Store } from './components/redux/store';
import HomeScreen from './components/HomeScreen';
import Courses from './components/Courses';
import Players from './components/Players';
import PlayerSelection from './components/roundcomponents/PlayerSelection';
import CourseSelection from './components/roundcomponents/CourseSelection';
import RoundScreen from './components/roundcomponents/RoundScreen';
import RoundHistory from './components/RoundHistory';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{
            headerStyle: styles.header
          } } />
          <Stack.Screen name="Courses" component={Courses} options={{ title: "All Courses", headerStyle: styles.header }} />
          <Stack.Screen name="Players" component={Players} options={{headerStyle: styles.header}} />
          <Stack.Screen name="PlayerSelection" component={PlayerSelection} options={{ title: "Player Selection", headerStyle: styles.header }} />
          <Stack.Screen name="CourseSelection" component={CourseSelection} options={{ title: "Course Selection", headerStyle: styles.header }} />
          <Stack.Screen name="RoundScreen" component={RoundScreen} options={{title: "Round", headerStyle: styles.header}} />
          <Stack.Screen name="RoundHistory" component={RoundHistory} options={{ title: "History of All Rounds", headerStyle: styles.header }} />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
}

const styles = StyleSheet.create(({
  header: {
    backgroundColor: "#177300",
    
  }
}))
