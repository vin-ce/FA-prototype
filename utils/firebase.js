import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyA57fsXcTORGuzw4wKugQSvgw2-BU9OMGU",
  authDomain: "knock-75155.firebaseapp.com",
  projectId: "knock-75155",
  storageBucket: "knock-75155.appspot.com",
  messagingSenderId: "68301472024",
  appId: "1:68301472024:web:8c96c3b1e4a653d5855e6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore'

export async function getId() {
  // const newCityRef = doc(collection(db, "cities"));
  // return newCityRef.id
  const ref = doc(collection(db, "userQuestionnaireAnswers"))
  return ref.id
}

export async function addQuestionnaireAnswer({ userId, question, answer }) {

  await addDoc(collection(db, "userQuestionnaireAnswers"), {
    userId,
    question,
    answer
  })

}