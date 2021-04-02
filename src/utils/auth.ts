import { User } from 'firebase'
import Firebase, { firestore } from './Firebase'

export const getUser = async (uid: string) => {
  return await firestore
    .collection('users')
    .doc(uid)
    .get()
}

export const FIREBASE_SIGNUP = async (email: string, password: string) => {
  const response = await Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error)
      const errorCode = error.code
      const errorMessage = error.message
      if (errorCode === 'auth/weak-password') {
        throw new Error(`Password is too weak.`)
      } else {
        throw new Error(errorMessage)
      }
    })

  if (response) {
    const user: User = await Firebase.auth().currentUser
    const currentUser = {
      uid: user.uid,
      email: user.email,
    }

    firestore
      .collection('users')
      .doc(response.user.uid)
      .set(currentUser)

    const token = await Firebase.auth().currentUser.getIdToken()

    localStorage.setItem('userData', JSON.stringify(currentUser))
    localStorage.setItem('userToken', token)

    return
  }
}

export const FIREBASE_SIGNIN = async (email: string, password: string) => {
  const response = await Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      if (errorCode === 'auth/invalid-email') {
        throw new Error(`Email address is not valid.`)
      } else if (errorCode === 'auth/user-disabled') {
        throw new Error(`User corresponding to the given email has been disabled.`)
      } else if (errorCode === 'auth/user-not-found') {
        throw new Error(`No user corresponding to the given email.`)
      } else if (errorCode === 'auth/wrong-password') {
        throw new Error(`Wrong password.`)
      } else {
        throw new Error(errorMessage)
      }
    })

  if (response) {
    const user = getUser(response.user.uid)

    const token = await Firebase.auth().currentUser.getIdToken()

    localStorage.setItem('userData', JSON.stringify(user))
    localStorage.setItem('userToken', token)

    return
  }
}

export const FIREBASE_SIGNOUT = async () => {
  await Firebase.auth()
    .signOut()
    .catch(error => console.log(error))

  localStorage.remove('userData')
  localStorage.remove('userToken')

  return
}
