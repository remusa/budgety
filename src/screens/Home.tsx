import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Firebase, { firestore } from '../utils/Firebase'
import { ITransaction } from './Transactions'

const HomeStyles = styled.section`
  height: 100%;
`

interface Props {}

const Home: React.FC<Props> = () => {
  // const { loggedIn, user } = useAuth()
  const [transactions, setTransactions] = useState([] as Array<ITransaction>)

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const allTransactions: Array<ITransaction> | any = []

        const snapshot = await firestore
          .collection('users')
          .doc(user.uid)
          .collection('transactions')
          .orderBy('date', 'desc')
          .get()

        snapshot.forEach(doc => {
          allTransactions.push({ ...doc.data(), id: doc.id })
        })

        setTransactions(allTransactions)
      } else {
        console.log(`NO USER FOUND`)
      }
    })
  }, [])

  const handleDelete = (e: React.MouseEvent) => {
    console.log('e', e.target)
  }

  return (
    <HomeStyles>
      <h1 data-testid='heading'>Budgety</h1>

      <div>
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              {transaction.note}{' '}
              <button type='button' onClick={handleDelete}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button type='button'>Add transaction</button>
    </HomeStyles>
  )
}

export default Home
