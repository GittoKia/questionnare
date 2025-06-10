import { createUser ,verifyUser} from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/CreateUser.scss'
import axios from "axios"
const CreateUser: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    let response = await createUser(user)
    let login = await verifyUser(user)
    if (login) {
      sessionStorage.setItem("User",login)
      axios.defaults.headers.common['Authorization']=`Bearer ${response}`
      navigate("/home")}
    if (response.status != 200) {
      alert("User account couldn't be created")
    }
  }

  function handleChange(e: { target: { name: any; value: any } }) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder={"Name"} onChange={handleChange} name="name" required></input>
      <input placeholder={"Email"} onChange={handleChange} name="email" required></input>
      <input placeholder={"Password"} onChange={handleChange} name="password" type='password' required></input>
      <div className='btnGroup'>
      <button type="submit" className='submit' >Sign Up</button>
      <button type="button" className='type' onClick={onSwitch}>Sign In</button>
        </div>
    </form>
  )
}

export default CreateUser