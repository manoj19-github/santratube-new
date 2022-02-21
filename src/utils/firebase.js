import {initializeApp} from "firebase/app"
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBXElX-mbyFOwYFYpf_1Qixv-BT-QaDJaM",
  authDomain: "santratube12.firebaseapp.com",
  projectId: "santratube12",
  storageBucket: "santratube12.appspot.com",
  messagingSenderId: "997477850622",
  appId: "1:997477850622:web:8f84cfe26f7a406eef34af",
  measurementId: "G-8PT0H4MBWL"
};
const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export {auth,provider}
