import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import firebaseConfig from '@/constants/firebaseConfig';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const auth = getAuth();
