import { useParams, Link } from 'react-router-dom';
import type { Topic } from '../types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTopic, updateTopic, deleteTopic } from '../api';
import '../styles/Topic.scss'
const ViewTopic = () => {

  //backend route for get Topic
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<Topic>()
  useEffect(() => {
    async function loadPost() {
      let data = await getTopic(id!)
      setTopic(data)
    }
    loadPost()
  }, [])

  //update topic information
  async function updateTopic(e
  ) {
  }

  //delete topic information
  async function handleDelete(e
  ) {
    await deleteTopic(topic._id)
    navigate(-1)
  }

  //return topic information
  if (!topic) return null;
  return (
    <div className='topic'>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{topic.title}</h1>
      <h2>{topic.description}</h2>
      <p>{topic.content}</p>
      <Link to={`/topic/${topic._id}/question/1`}>Start</Link>
      <button onSubmit={updateTopic}>Update Topic</button>
      <button onClick={handleDelete}>Delete Topic</button>
    </div>
  );
}

export default ViewTopic