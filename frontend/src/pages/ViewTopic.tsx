import { useParams, Link } from 'react-router-dom';
import type { Topic } from '../types';
import { convertDate } from '../types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTopic, deleteTopic } from '../api';
import Spinner from '../components/Spinner';
import '../styles/Topic.scss'
export const sleep = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));
const ViewTopic = () => {

  //backend route for get Topic
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<Topic>()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function loadPost() {
      let data = await getTopic(id)
      console.log(data)
      setTopic(data)
      await sleep(500);
      setLoading(false)
    }
    loadPost()
  }, [])

  //update topic information
  async function handleUpdate(e: React.FormEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    if (topic) {
      navigate(`/topic/${topic._id}/update`)
    }
    else {
      navigate("/home")
    }
  }

  //delete topic information
  async function handleDelete(e: React.FormEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    if (topic) {
      try {
        await deleteTopic(topic._id)
      }
      finally { navigate("/home") }
    }
    else {
      navigate('/home')
    }

  }

  //return topic information
  if (!topic) return null;
  return (
    <div>
      {loading ? (<Spinner loading={loading} />) : (
        <div className='topic'>
          <button onClick={() => navigate("/home")}>Back</button>
          <h1>{topic.title}</h1>
          <h2>{topic.description}</h2>
          <p>{topic.content}</p>
         <img src={topic.image}/>
          <h3>{convertDate(new Date(topic.dateCreated))}</h3>
          <Link to={`/topic/${topic._id}/question/1`}>Start</Link>
          <button onClick={handleUpdate}>Update Topic</button>
          <button onClick={handleDelete}>Delete Topic</button>
        </div>)}
    </div>
  );
}

export default ViewTopic