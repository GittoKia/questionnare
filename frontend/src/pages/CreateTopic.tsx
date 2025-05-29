import { useState} from "react"
import { createTopic } from "../api"
import { useNavigate } from "react-router-dom"
import '../styles/CreateTopic.scss'
const CreateTopic = ({ premade }: { premade: boolean }) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")

const navigate=useNavigate()

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    let submitObject = {
      title: title,
      description: description,
      content: content,
    }
    await createTopic(submitObject)
    navigate(-1)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Topic Title:</label>
      <input onChange={(e) => setTitle(e.target.value)} required></input>

      <label>Topic Description:</label>
      <input onChange={(e) => setDescription(e.target.value)} required></input>

      <label>Topic Content:</label>
      <input onChange={(e) => setContent(e.target.value)} required></input>

      <label>Question 1:</label>
      <input></input>

      <div className='true-false'>
        <label className="mb-1 font-medium">Correct answer</label>
        <label className="mr-4 inline-flex items-center gap-1">
          <input
            type="radio"
            name="answer"
            value="true"
            className="accent-blue-600"
          />
          True
        </label>

        <label className="inline-flex items-center gap-1">
          <input type="radio" name="answer" value="false" className="accent-blue-600" />
          False
        </label>
      </div>

      <label>Question 2:</label>
      <input></input>

      <div className='true-false'>
        <label className="mb-1 font-medium">Correct answer</label>
        <label className="mr-4 inline-flex items-center gap-1">
          <input type="radio" name="answer" value="true" className="accent-blue-600" />
          True
        </label>

        <label className="inline-flex items-center gap-1">
          <input type="radio" name="answer" value="false" className="accent-blue-600" />
          False
        </label>
      </div>

      <label>Question 3:</label>
      <input></input>

      <div className='true-false'>
        <label className="mb-1 font-medium">Correct answer</label>

        <label className="mr-4 inline-flex items-center gap-1">
          <input type="radio" name="answer" value="true" className="accent-blue-600" />
          True
        </label>

        <label className="inline-flex items-center gap-1">
          <input type="radio" name="answer" value="false" className="accent-blue-600" />
          False
        </label>
      </div>

      <label>Question 4:</label>
      <input></input>

      <div className='true-false'>
        <label className="mb-1 font-medium">Correct answer</label>

        <label className="mr-4 inline-flex items-center gap-1">
          <input type="radio" name="answer" value="true" className="accent-blue-600" />
          True
        </label>

        <label className="inline-flex items-center gap-1">
          <input type="radio" name="answer" value="false" className="accent-blue-600" />
          False
        </label>
      </div>

      <label>Question 5:</label>
      <input></input>
      <div className='true-false'>
        <label className="mb-1 font-medium">Correct answer</label>

        <label className="mr-4 inline-flex items-center gap-1">
          <input type="radio" name="answer" value="true" className="accent-blue-600" />
          True
        </label>

        <label className="inline-flex items-center gap-1">
          <input type="radio" name="answer" value="false" className="accent-blue-600" />
          False
        </label>
      </div>

      <button type='submit'>Submit</button>
    </form>
  )
}

export default CreateTopic