import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

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
      return { success: true, user: { ...userData, emailVerified: true } }
    }

    return { success: false, error: "User data not found" }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Logout user
export async function logoutUser() {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Auth state observer
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
