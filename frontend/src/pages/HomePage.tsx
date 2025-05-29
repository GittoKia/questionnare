import TopicCard from '../components/TopicCard'
import { useState, useEffect } from 'react'
import { getTopics } from '../api'
import '../styles/HomePage.scss'
const HomePage = () => {

    //Code for backend route
    const [topics, setTopics] = useState([])
    useEffect(() => {
        async function loadAllPosts() {
            let data = await getTopics()
            if (data) {
                setTopics(data)
            }
        } loadAllPosts()
    }, [])

    return (
        <div className='Cards'>
            {topics.map((t) => (
                <TopicCard topic={t} />
            ))}
        </div>
    )
}

export default HomePage