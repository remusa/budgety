import React from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../context/Auth/AuthContext'

const HeaderStyles = styled.header`
  grid-area: header;
  padding: 16px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-right {
      /* width: 200px; */

      display: flex;
      justify-content: space-around;

      & > * {
        margin-left: 8px;
      }
    }
  }
`

interface Props extends RouteComponentProps {}

const Header: React.FC<Props> = props => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    props.history.push('/login')
  }

  return (
    <HeaderStyles>
      <nav role='navigation' aria-label='main navigation'>
        <span>
          <NavLink to='/'>Home</NavLink>
        </span>

        <span className='nav-right'>
          {!user ? (
            <>
              <NavLink to='/login'>Log in</NavLink>

              <NavLink to='/register'>
                <strong>Sign up</strong>
              </NavLink>
            </>
          ) : (
            <>
              <span>{user.displayName || user.email}</span>

              <button onClick={handleLogout}>
                <strong>Logout</strong>
              </button>
            </>
          )}
        </span>
      </nav>
    </HeaderStyles>
  )
}

export default withRouter(Header)
