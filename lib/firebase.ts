import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') {
    return null // Return null during SSR
  }
  
  if (!getApps().length) {
    return initializeApp(firebaseConfig)
  }
  return getApps()[0]!
}

// Initialize Firebase services with browser check
let auth: Auth
let db: Firestore

// Create getter functions that initialize on demand
export function getFirebaseAuth(): Auth {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used in browser environment')
  }
  
  if (!auth) {
    const app = getFirebaseApp()
    if (!app) {
      throw new Error('Firebase app not initialized')
    }
    auth = getAuth(app)
  }
  return auth
}

export function getFirebaseDb(): Firestore {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Firestore can only be used in browser environment')
  }
  
  if (!db) {
    const app = getFirebaseApp()
    if (!app) {
      throw new Error('Firebase app not initialized')
    }
    db = getFirestore(app)
  }
  return db
}

// Export instances for backward compatibility (will be undefined during SSR)
export { auth, db }
