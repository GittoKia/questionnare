import TopicCard from '../components/TopicCard'
import { useState, useEffect } from 'react'
import { getTopics } from '../api'
import Spinner from '../components/Spinner'
import '../styles/HomePage.scss'
import type { Topic } from '../types'
const HomePage = () => {

    //Code for backend route
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function loadAllPosts() {
            let data = await getTopics()
            if (data) {
                data.sort((d1:Topic, d2:Topic) => new Date(d2.dateCreated).getTime() - new Date(d1.dateCreated).getTime())
                setTopics(data)
            }
            setLoading(false)
        } loadAllPosts()
    }, [])

    return (
        <div>
            {loading ? (<Spinner loading={loading} />) : (
                <div className='Cards'>
                    {topics.map((t) => (
                        <TopicCard topic={t} />
                    ))}
                </div>)}
        </div>


    )
}

export default HomePage