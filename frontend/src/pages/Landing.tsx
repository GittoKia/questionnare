import { useState } from "react"
import CreateUser from "../components/CreateUser"
import Login from "../components/Login"

const Landing = () => {
  const [view, setView] = useState(true)
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      {view ? 
      <div className='flex flex-col w-96'>
      <Login />
      <button onClick={()=>setView(!view)}>Create New Account</button>
      </div> : 
      <div className='flex flex-col w-96'>
      <CreateUser/>
      <button onClick={()=>setView(!view)}>Login Existing Account</button>
      </div>}
    </div>
  )
}

export default Landing