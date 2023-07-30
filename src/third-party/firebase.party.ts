import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { FirebaseConfig } from '../config';
import firebaseConfig from '../config/firebase.config';

const createFirebaseApp = () => {
  initializeApp(firebaseConfig);
};

export default createFirebaseApp;
