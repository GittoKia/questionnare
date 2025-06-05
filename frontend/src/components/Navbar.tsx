import '../styles/Navbar.scss'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem("User")
        navigate("/")

    }
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
        to="/profile"
        className='n'
      >Profile</NavLink>
      <NavLink
        to="/createTopic"
        className='n'
      >Blog</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar