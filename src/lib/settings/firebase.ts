import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDRQunJt2Hsc3_qjaayFV3xEWA5GSMMs5M',
	authDomain: 'hram-babynino-70b96.firebaseapp.com',
	databaseURL: 'https://hram-babynino-70b96-default-rtdb.firebaseio.com',
	projectId: 'hram-babynino-70b96',
	storageBucket: 'hram-babynino-70b96.firebasestorage.app',
	messagingSenderId: '207872623641',
	appId: '1:207872623641:web:fa38fda2bfd87a657d9688',
	measurementId: 'G-Y29EMKKJ3Q'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'ru';
export const db = getDatabase(app);
export const storage = getStorage(app);
