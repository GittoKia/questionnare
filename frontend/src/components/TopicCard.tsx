import { Link } from 'react-router-dom';
import type { OneTopicProps } from '../types';
import '../styles/TopicCard.scss'
const TopicCard = ({ topic }: OneTopicProps) => {

  //link to expand on topic
  return (
    <div className='topicCard'>
      <Link to={`/topic/${topic._id}`}>
        <h1>{topic.title}</h1>
        <h2>{topic.description}</h2>
      </Link>
    </div>
  )
}

export default TopicCard