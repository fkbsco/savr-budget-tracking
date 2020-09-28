import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { UserProvider } from '../UserContext'

import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({
      id: null
  })

  useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(res => res.json())
      .then(data => {
          if(data._id){
              setUser({
                  id: data._id
              })
          }else{
              setUser({
                  id: null
              })
          }            
      })
  }, [user.id])

  const unsetUser = () => {
      localStorage.clear()

      setUser({
          id: null
      });
  }

  return (
      <React.Fragment>
          <UserProvider value={{user, setUser, unsetUser}}>
              <Container>
                  <Component {...pageProps} />
              </Container>
          </UserProvider>
      </React.Fragment>
  )
}
