import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDJFQkyRs11yZ9LpWGcekrU8O8qdrWyJKk",
    authDomain: "discgolfapp-20dd1.firebaseapp.com",
    databaseURL: "https://discgolfapp-20dd1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "discgolfapp-20dd1",
    storageBucket: "discgolfapp-20dd1.appspot.com",
    messagingSenderId: "347037877648",
    appId: "1:347037877648:web:b58b7ed49a3ab4cf241f15"
  };
  
  const app = initializeApp(firebaseConfig)
  export const db = getDatabase(app)

