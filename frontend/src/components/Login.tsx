import { verifyUser } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/Auth.scss";
const Login: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) =>  {

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
    <form onSubmit={handleSubmit} className="auth__form">
      <input
        className="auth__input"
        placeholder="Email"
        onChange={handleChange}
        name="email"
        required
        maxLength={30}
      />
      <input
        className="auth__input"
        placeholder="Password"
        onChange={handleChange}
        name="password"
        type="password"
        required
        maxLength={20}
      />

      <div className="auth__buttons">
        <button type="submit" className="auth__submit">Login</button>
        <button type="button" onClick={onSwitch} className="auth__switch">
          Create Account
        </button>
      </div>
    </form>
  );
}

export default Login