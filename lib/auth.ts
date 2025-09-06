import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { getFirebaseAuth, getFirebaseDb } from "./firebase"
import { setUserData, removeUserData, getUserData } from "./localStorage"
import { setAuthTokenCookie, removeAuthTokenCookie, getAuthTokenCookie } from "./cookies"

export interface UserData {
  uid: string
  email: string
  name: string
  emailVerified: boolean
  createdAt: Date
}

// Register user with email verification
export async function registerUser(email: string, password: string, name: string) {
  try {
    if (typeof window === 'undefined') {
      return { success: false, error: "Not available during server-side rendering" }
    }
    
    const auth = getFirebaseAuth()
    const db = getFirebaseDb()
    
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Send email verification
    await sendEmailVerification(user, {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false
    })

    // Create user document in Firestore
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      name: name,
      emailVerified: false,
      createdAt: new Date()
    }

    await setDoc(doc(db, "users", user.uid), userData)

    return { success: true, user: userData }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Login user
export async function loginUser(email: string, password: string) {
  try {
    if (typeof window === 'undefined') {
      return { success: false, error: "Not available during server-side rendering" }
    }
    
    const auth = getFirebaseAuth()
    const db = getFirebaseDb()
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Check if email is verified
    if (!user.emailVerified) {
      await signOut(auth)
      return { 
        success: false, 
        error: "Please verify your email before logging in. Check your inbox for verification link." 
      }
    }

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData
      // Update email verification status
      if (!userData.emailVerified) {
        await setDoc(doc(db, "users", user.uid), { 
          ...userData, 
          emailVerified: true 
        }, { merge: true })
      }
      
      const finalUserData = { ...userData, emailVerified: true }
      
      // Store user data in localStorage
      setUserData(finalUserData)
      
      // Store auth token (Firebase ID token) in cookies
      const token = await user.getIdToken()
      setAuthTokenCookie(token)
      
      // Trigger custom event to update UI immediately
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('userLoggedIn'))
      }
      
      return { success: true, user: finalUserData }
    }

    return { success: false, error: "User data not found" }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Logout user
export async function logoutUser() {
  try {
    if (typeof window === 'undefined') {
      return { success: false, error: "Not available during server-side rendering" }
    }
    
    const auth = getFirebaseAuth()
    await signOut(auth)
    
    // Clear user data from localStorage
    removeUserData()
    removeAuthTokenCookie()
    
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Get current user from localStorage
export function getCurrentUser(): UserData | null {
  return getUserData()
}

// Get current auth token from cookies
export function getCurrentAuthToken(): string | null {
  return getAuthTokenCookie()
}

// Check if user is logged in
export function isUserLoggedIn(): boolean {
  const user = getCurrentUser()
  const token = getCurrentAuthToken()
  return !!(user && token)
}

// Auth state observer
export function onAuthStateChange(callback: (user: User | null) => void) {
  if (typeof window === 'undefined') {
    return () => {} // Return empty unsubscribe function during SSR
  }
  
  try {
    const auth = getFirebaseAuth()
    return onAuthStateChanged(auth, callback)
  } catch {
    return () => {} // Return empty unsubscribe function if Firebase fails
  }
}
