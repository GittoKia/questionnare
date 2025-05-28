
import { useState } from "react"
const CreateTopic = () => {

const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [questions,setQuestions]=useState([""])
  const [answers,setAnswers]=useState<boolean[]>([])

  return (
    <form>
      <label>Topic Title:</label>
      <input onChange={(e) => setTitle(e.target.value)}></input>

      <label>Topic Description:</label>
      <input onChange={(e) => setDescription(e.target.value)}></input>
      
      <label>Topic Content:</label>
      <input onChange={(e) => setContent(e.target.value)}></input>
      
      <label>Question 1:</label>
      <input></input>
      
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
        <input type="radio" name="answer" value="false" className="accent-blue-600"/>
        False
      </label>

      <label>Question 2:</label>
      <input></input>

      <label className="mb-1 font-medium">Correct answer</label>

      <label className="mr-4 inline-flex items-center gap-1">
        <input type="radio" name="answer" value="true" className="accent-blue-600"/>
        True
      </label>

      <label className="inline-flex items-center gap-1">
        <input type="radio" name="answer" value="false" className="accent-blue-600"/>
        False
      </label>

      <label>Question 3:</label>
      <input></input>

      <label className="mb-1 font-medium">Correct answer</label>

      <label className="mr-4 inline-flex items-center gap-1">
        <input type="radio" name="answer" value="true" className="accent-blue-600"/>
        True
      </label>

      <label className="inline-flex items-center gap-1">
        <input type="radio" name="answer" value="false" className="accent-blue-600"/>
        False
      </label>

      <label>Question 4:</label>
      <input></input>

      <label className="mb-1 font-medium">Correct answer</label>

      <label className="mr-4 inline-flex items-center gap-1">
        <input type="radio" name="answer" value="true" className="accent-blue-600"/>
        True
      </label>

      <label className="inline-flex items-center gap-1">
        <input type="radio" name="answer" value="false" className="accent-blue-600"/>
        False
      </label>

      <label>Question 5:</label>
      <input></input>

      <label className="mb-1 font-medium">Correct answer</label>

      <label className="mr-4 inline-flex items-center gap-1">
        <input type="radio" name="answer" value="true" className="accent-blue-600"/>
        True
      </label>

      <label className="inline-flex items-center gap-1">
        <input type="radio" name="answer" value="false" className="accent-blue-600"/>
        False
      </label>

    </form>
  )
}

export default CreateTopic