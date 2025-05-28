import topicsData from '../topics.json'
import TopicCard from '../components/TopicCard'
import { type Topic } from '../types'
import '../styles/HomePage.scss'
const HomePage = () => {
    const topics: Topic[] = topicsData.topics
    return (
        <div className='Cards'>
            {topics.map((t) => (
                <TopicCard key={t.id} topic={t} />
            ))}
        </div>
    )
}

export default HomePage