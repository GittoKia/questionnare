import { verifyUser } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const Login = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    let response = await verifyUser(user)
    if (response) {
      sessionStorage.setItem("User",response)
      axios.defaults.headers.common['Authorization']=`Bearer ${response}`
      navigate("/home")
    }
    else {
      alert("Login Failed")
    }
  }

  function handleChange(e: { target: { name: any; value: any } }) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder={"Email"} onChange={handleChange} name="email" required></input>
      <input placeholder={"Password"} onChange={handleChange} name="password" type='password' required></input>
      <button type="submit" >Login</button>
    </form>
  )
}

export default Login