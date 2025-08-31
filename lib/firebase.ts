import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
// If you plan to use auth & firestore later:
// import { getAuth } from "firebase/auth"
// import { getFirestore } from "firebase/firestore"

export function getFirebaseApp(): FirebaseApp {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }
  if (!getApps().length) {
    return initializeApp(config as any)
  }
  return getApps()[0]!
}
