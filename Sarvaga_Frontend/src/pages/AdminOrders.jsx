import React from 'react'
import Navbar from '../components/Navbar'
import { useAuth0 } from '@auth0/auth0-react'
import PropagateLoader from 'react-spinners/PropagateLoader';
function AdminOrders() {
  const {isLoading} = useAuth0();
  return (
    <>
    {isLoading ? <div className="flex items-center justify-center min-h-screen">
      <PropagateLoader color='#A855F7' />        </div> : <div>
      <Navbar></Navbar>
      This is Orders Page
  </div>}
  </>
  )
}

export default AdminOrders