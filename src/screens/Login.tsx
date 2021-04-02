import React from 'react'
import useForm from 'react-hook-form'
import { RouterProps, withRouter } from 'react-router'
import styled from 'styled-components'
import * as yup from 'yup'
import { FIREBASE_SIGNIN } from '../utils/auth'
import { signInWithGoogle } from '../utils/Firebase'
import { emailValidation, passwordValidation } from '../utils/validationSchemas'

const validationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
})

const LoginStyles = styled.section`
  text-align: center;

  .error-message {
    color: red;
  }
`

export interface IUser {
  email: string
  password: string
}

interface Props extends RouterProps {}

const Login: React.FC<Props> = props => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, dirty, isValid },
  } = useForm<IUser>({
    validationSchema,
  })

  const onSubmit = async ({ email, password }: IUser) => {
    try {
      await FIREBASE_SIGNIN(email, password)
      props.history.push('/')
      // return <Redirect to='/' />
    } catch (e) {
      console.log(`FAILED SIGNING IN: ${e.message}`)
    }
  }

  return (
    <LoginStyles>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
            <h1 data-testid='login-page'>Login to your account</h1>

            <div>
              <label htmlFor='email'>Email</label>

              <p>
                <input
                  type='email'
                  name='email'
                  className='input'
                  placeholder='Email'
                  ref={register}
                />
              </p>

              {errors.email && <span className='error-message'>{errors.email.message}</span>}
            </div>

            <div>
              <label htmlFor='password'>Password</label>

              <p>
                <input
                  type='password'
                  name='password'
                  className='input'
                  placeholder='*****'
                  ref={register}
                />
              </p>

              {errors.password && <span className='error-message'>{errors.password.message}</span>}
            </div>

            <div>
              <p>
                <button type='submit'>Login</button>

                <button type='reset'>Reset</button>
              </p>
            </div>
          </fieldset>

          <div style={{ color: 'red' }}>
            <pre>
              {Object.keys(errors).length > 0 && (
                <label>Errors: {JSON.stringify(errors, null, 2)}</label>
              )}
            </pre>
          </div>
        </form>
      </div>

      <div>
        <button type='button' onClick={signInWithGoogle}>
          Sign In with Google
        </button>
      </div>
    </LoginStyles>
  )
}

export default withRouter(Login)
