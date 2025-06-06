import '../styles/Navbar.scss'
import { NavLink } from 'react-router-dom'
import * as jwt_decode from 'jwt-decode'
import { useMemo } from 'react'
import { useLogout } from '../types'
const Navbar = () => {
  const t = sessionStorage.getItem("User")
  const logout=useLogout()
  const userId = useMemo(() => {
    if (t) {
      try {
        const decoded = jwt_decode.jwtDecode<{ _id: string }>(t)
        return decoded._id
      } catch {
        return null
      }
    }
    return null
  }, [t])

  return (
    <div className='navbar'>
      <NavLink
        to="/home"
        className='n'
      >Home</NavLink>
      <NavLink
        to="/about"
        className='n'
      >About</NavLink>
      <NavLink
        to={userId ? `/profile/${userId}` : "/"}
        className='n'
      >Profile</NavLink>
      <NavLink
        to="/createTopic"
        className='n'
      >Blog</NavLink>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar