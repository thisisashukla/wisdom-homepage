import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAu2euDVJoMMBFRUwRLA159aBrQ7iCUwKE",
  authDomain: "wisdom-homepage.firebaseapp.com",
  projectId: "wisdom-homepage",
  storageBucket: "wisdom-homepage.firebasestorage.app",
  messagingSenderId: "330314084752",
  appId: "1:330314084752:web:60ad4b4e351e4be1d1c315",
  measurementId: "G-7YD3TTWVBD",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { app, auth, googleProvider }
