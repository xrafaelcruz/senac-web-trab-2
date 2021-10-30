import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyAWdJOx6PXM0Y6Gsz_JONIfUsdyJr3FzHU",
    authDomain: "senac-web-trab-2.firebaseapp.com",
    projectId: "senac-web-trab-2",
    storageBucket: "senac-web-trab-2.appspot.com",
    messagingSenderId: "1084529671123",
    appId: "1:1084529671123:web:3a1a6966cabcadc6660d26"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
