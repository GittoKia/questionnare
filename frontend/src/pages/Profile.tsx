import TopicCard from "../components/TopicCard"
import type { Topic,User } from "../types"
import { useState, useEffect } from "react"
import { getTopics } from "../api"
import { getUser } from "../api"
import * as jwt_decode from 'jwt-decode'

const Profile = () => {
    const [myTopics, setMyTopics] = useState<Topic[]>([])
    const [visitedTopics, setVisitedTopics] = useState<Topic[]>([])
    const [user, setUser] = useState<User>()

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
    if (!user) return null;
    return (
        
        <div >
      <label >Name:</label>
      <h2 >{user.name}</h2>
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
              user.visitedPosts?.find(([id]) => id === topic._id)?.[1]
            }
          </h2>
          </div>
        )
      })}
    </div>
    )
}

export default Profile