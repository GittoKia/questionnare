import TopicCard from '../components/TopicCard'
import { type Topic } from '../types'
import { useState, useEffect } from 'react'
import { getTopics } from '../api'
import '../styles/HomePage.scss'
import {useState,useEffect } from 'react'
import {getTopics} from '../api.js'
const HomePage = () => {

    //Code for backend route
    const [tees, setTees] = useState([])
    useEffect(() => {
        async function loadAllPosts() {
            let data = await getTopics()
            if (data) {
                setTees(data)
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