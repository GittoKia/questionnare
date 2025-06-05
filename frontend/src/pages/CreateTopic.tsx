import { useState, useEffect ,useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTopic, getTopic, updateTopic } from '../api';
import type { Topic } from '../types';
import '../styles/CreateTopic.scss';

const CreateTopic = ({ premade }: { premade: boolean }) => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [file,setFile]=useState()
const MAX_FILE_SIZE=15000000

  const inputFile=useRef(null)
  type QuestionForm = {
    prompt: string;
    answer: boolean | null;   // null  = not chosen yet
  };

  const emptyQuestion = (): QuestionForm => ({ prompt: '', answer: null });

  const [questions, setQuestions] = useState<QuestionForm[]>(
    Array(5).fill(null).map(emptyQuestion)
  );

  useEffect(() => {
    async function loadPost() {
      if (!premade || !id) return;

      const data: Topic = await getTopic(id);
      setTitle(data.title);
      setDescription(data.description);
      setContent(data.content);

      setQuestions(
        data.questions.map((q) => ({
          prompt: q.prompt,
          answer: q.answer,          // true / false boolean
        })))

    }
    loadPost();
  }, []);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let submitObject = {
      title:title,
      description:description,
      content:content,
      dateCreated: new Date(),
      file:file,
      questions: questions.map((q) => ({
        prompt: q.prompt,
        answer: q.answer as boolean,   // now safely non‑null
      })),
    };

    if (!premade || !id) {
      try {
        await createTopic(submitObject);
      }
      finally {
        navigate("/home");
      }
    }
    else {

      if (id) {
        try {
          await updateTopic(id, submitObject)
          navigate(`/topic/${id}`)
        }
        finally {
          navigate("/home")
        }
      }
      else {
        navigate("/home")
      }
    }

  }

function handleFileUpload(e){
const file=e.target.files[0]
console.log(file)
const fileExtension=file.name.substring(file.name.lastIndexOf("."))
if (fileExtension!= ".jpg" && fileExtension!= ".jpeg" && fileExtension != ".png"){
  alert("Files must be jpg or png")
  inputFile.current.value=""
  inputFile.current.type="file"
  return
}
if (file.size>MAX_FILE_SIZE){
  alert("file size exeeds limit (15 MB)")
  inputFile.current.value=""
  inputFile.current.type="file"
  return
}
setFile(file)

  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Topic Title:</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Topic Description:</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Topic Content:</label>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <label>Insert Header Image:</label>
      <input
      type="file"
        onChange={handleFileUpload}
         ref={inputFile}
        required
      />

      {questions.map((q, i) => (
        <div key={i} className="question-block">
          <label>Question {i + 1}:</label>
          <input
            value={q.prompt}
            onChange={(e) =>
              setQuestions((prev) => {
                const next = [...prev];
                next[i] = { ...next[i], prompt: e.target.value };
                return next;
              })
            }
            required
          />

          <div className="true-false">
            <label className="label">Correct answer&nbsp;</label>

            <label>
              <input
                type="radio"
                name={`answer-${i}`}     // **unique group per question**
                value="true"
                checked={q.answer === true}
                onChange={() =>
                  setQuestions((prev) => {
                    const next = [...prev];
                    next[i] = { ...next[i], answer: true };
                    return next;
                  })
                }
                required
              />
              True
            </label>

            <label>
              <input
                type="radio"
                name={`answer-${i}`}
                value="false"
                checked={q.answer === false}
                onChange={() =>
                  setQuestions((prev) => {
                    const next = [...prev];
                    next[i] = { ...next[i], answer: false };
                    return next;
                  })
                }
                required
              />
              False
            </label>
          </div>
        </div>
      ))}


      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateTopic;
