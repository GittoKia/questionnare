import { useState } from "react"
import CreateUser from "../components/CreateUser"
import Login from "../components/Login"
import '../styles/Landing.scss'
const Landing = () => {
  const [view, setView] = useState(true)
  const Switch = () => setView(!view);
  return (
    <div className='both'>
      <h1>{view ? "Sign In" : "Create Account"}</h1>
      {view ? 
      <div className='one login'>
      <Login onSwitch={Switch}/>
      </div> : 
      <div className='one create'>
      <CreateUser onSwitch={Switch}/>
      </div>}
    </div>
  )
}

export default Landing