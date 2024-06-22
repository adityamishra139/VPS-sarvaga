import React from 'react'
import Navbar from '../components/Navbar'
import { useAuth0 } from '@auth0/auth0-react'
import PropagateLoader from 'react-spinners/PropagateLoader';
export default function SalwaarSuits() {
  const {isLoading} = useAuth0();
  return (
    <div>
      {isLoading ? <div className="flex items-center justify-center min-h-screen">
        <PropagateLoader color='#A855F7' />        </div> : <><Navbar></Navbar>
        <strong>Coming soon ....</strong></>}
      
      </div>
  )
}
