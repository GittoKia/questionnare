import TopicCard from '../components/TopicCard'
import { type Topic } from '../types'
import '../styles/HomePage.scss'
import {useState,useEffect } from 'react'
import {getTopics} from '../api.js'
const HomePage = () => {
    const [topics, setTopics] = useState([])


    useEffect(()=>{async function loadAllPosts(){
let data=await getTopics()
if (data){
    setTopics(data)
}
    }loadAllPosts()},[])
    return (
        <div className='Cards'>
            {topics.map((t) => (
                <TopicCard key={t.id} topic={t} />
            ))}
        </div>
    )
}

export default HomePage