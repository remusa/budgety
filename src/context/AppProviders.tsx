import React from 'react'
import { AuthProvider } from './Auth/AuthContext'

interface Props {
  children: Element | HTMLElement // | ReactElement | ReactNode
}

const AppProviders: React.FC<Props> = ({ children }) => <AuthProvider>{children}</AuthProvider>

export default AppProviders
