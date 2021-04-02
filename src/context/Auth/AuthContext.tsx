import { User } from 'firebase'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Firebase, { signOut } from '../../utils/Firebase'

interface IAuthContext {
  user: any
  logout: () => void
  loggedIn: () => void
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

interface IProps {
  children: HTMLElement
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false)

  const logout = async () => {
    await signOut()
  }

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        setIsLoggedIn(true)
      } else {
        setUser(undefined)
        setIsLoggedIn(false)
      }
    })
  }, [])

  // if (user === undefined) {
  //   return <div>Loading...</div>
  // }

  return <AuthContext.Provider value={{ loggedIn, user, logout }}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
