import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [user, setUser] = useAuth();
  return (
    <Layout title={'Best Offers'}>
      <h1>Home Page</h1>
      <p>
        {/* {user} */}
      </p>
    </Layout>
  )
}

export default HomePage
