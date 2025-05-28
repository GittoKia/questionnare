import { useParams, Link } from 'react-router-dom';
import type {AllTopicsProps} from '../types';
import { useNavigate } from 'react-router-dom';
import '../styles/Topic.scss'
const Topic = ({topics}:AllTopicsProps) => {
  const { id } = useParams<{ id: string }>();
  const topic = topics.find((t) => t.id === Number(id));
  const navigate=useNavigate()
if (!topic) return <p>Topic not found.</p>;

//return topic information
  return (
    <div className='topic'>
      <button onClick={()=>navigate(-1)}>Back</button>
      <h1>{topic.title}</h1>
      <h2>{topic.description}</h2>
      <p>{topic.content}</p>
      <Link to={`/topic/${topic.id}/question/1`}>Start</Link>
      <button>Update Topic</button>
      <button>Delete Topic</button>
    </div>
  );
}

export default Topic