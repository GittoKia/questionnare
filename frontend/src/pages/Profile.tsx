import TopicCard from "../components/TopicCard"
import type { Topic,User } from "../types"
import { useState, useEffect } from "react"
import { getTopics } from "../api"
import { getUser } from "../api"
import * as jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const [myTopics, setMyTopics] = useState<Topic[]>([])
    const [visitedTopics, setVisitedTopics] = useState<Topic[]>([])
    const [user, setUser] = useState<User>()
const navigate=useNavigate()
    useEffect(() => {
        async function loadUserData() {
            const token = sessionStorage.getItem("User")
            if (token){
            const decodedToken = jwt_decode.jwtDecode<{ _id: string }>(token)
            const decodedUser = await getUser(decodedToken._id)

            const allPosts = await getTopics()
            const filteredPosts = allPosts.filter((topic:Topic) => topic.author == decodedUser._id)
            console.log(decodedUser.visitedPosts)
            const scoredPosts = allPosts.filter((topic:Topic) => decodedUser.visitedPosts?.some(([id]:string) => id === topic._id))
            setMyTopics(filteredPosts)
            setVisitedTopics(scoredPosts)
            setUser(decodedUser)}
        } loadUserData()
    }, [])

async function handleUpdate(e: React.FormEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    const token = sessionStorage.getItem("User")
            if (token){
            const decodedToken = jwt_decode.jwtDecode<{ _id: string }>(token)
      navigate(`/profile/${decodedToken._id}/update`)
    }
    else {
      navigate("/")
    }
  }

    if (!user) return null;
    return (
        
        <div >
      <label >Name:</label>
      <h1 >{user.name}</h1>
      <label>Email:</label>
      <h2 >{user.email}</h2>
      <label >Join Date:</label>
      <h2 className="flex left-0 mb-4">{user.joinDate}</h2>
      <h3>My own</h3>
      {myTopics.map((topic)=>{
        return(
          <TopicCard topic={topic}/>
          
        )
      })}
      <h3>Visited</h3>
      {visitedTopics.map((topic)=>{
        return(
            <div>
          <TopicCard topic={topic}/>
          <h2>
            {
             String( user.visitedPosts?.find(([id]) => id === topic._id)?.[1])+"/"+String( user.visitedPosts?.find(([id]) => id === topic._id)?.[2])
            }
          </h2>
          
          </div>
        )
      })}
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
    )
}

export default Profile