import { createUser } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const CreateUser = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    let response = await createUser(user)
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
      <button type="submit" >Create Account</button>
    </form>
  )
}

export default CreateUser