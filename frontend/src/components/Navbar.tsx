import '../styles/Navbar.scss'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
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
        to="/createTopic"
        className='n'
      >Blog</NavLink>
    </div>
  )
}

export default Navbar