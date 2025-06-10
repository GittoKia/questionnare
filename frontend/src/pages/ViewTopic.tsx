import { useParams, Link } from 'react-router-dom';
import type { Topic } from '../types';
import { convertDate } from '../types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTopic, deleteTopic,getUser } from '../api';
import * as jwt_decode from 'jwt-decode'
import '../styles/Topic.scss'
export const sleep = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));
const ViewTopic = () => {

  //backend route for get Topic
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<Topic>()
  const[userName,setUserName]=useState("")
  const token=sessionStorage.getItem('User')
  let boole=false;
if (token && topic){
            const decodedToken = jwt_decode.jwtDecode<{ _id: string }>(token)
boole=(decodedToken._id==topic.author);}

  useEffect(() => {
    async function loadPost() {
      let data = await getTopic(id)
      setTopic(data)
      if (data && data.author) {
      const user = await getUser(data.author);
      setUserName(user.name); // assumes user object has a 'name' property
    }
      await sleep(500);
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
  <div className="topic">
    <button onClick={() => navigate("/home")} className="topic__back">
      ← Back
    </button>

    <h1 className="topic__title">{topic.title}</h1>
    <h2 className="topic__subtitle">{topic.description}</h2>

    <p className="topic__content">{topic.content}</p>

    <div className="topic__meta">
      <span>{convertDate(new Date(topic.dateCreated))}</span>
      <span>by {userName}</span>
    </div>

    <div className="topic__cta">
      <Link to={`/topic/${topic._id}/question/1`} className="topic__start">
        Start
      </Link>

      {boole && (
        <>
          <button onClick={handleUpdate} className="topic__button">
            Update Topic
          </button>
          <button
            onClick={handleDelete}
            className="topic__button topic__button--danger"
          >
            Delete Topic
          </button>
        </>
      )}
    </div>
  </div>
);
}

export default ViewTopic