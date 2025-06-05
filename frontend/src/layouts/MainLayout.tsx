import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

const MainLayout = () => {
  
  let user = sessionStorage.getItem("User")
  let navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  },[user])
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayout