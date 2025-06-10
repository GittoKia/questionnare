import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTopic, getTopic, updateTopic } from '../api';
import type { Topic, Question } from '../types';
import * as jwt_decode from 'jwt-decode'
import '../styles/CreateTopic.scss';

//fill up questions
const emptyQuestion = (): Question => ({
  prompt: '',
  type: 'truefalse',
  answers: [true, false],
  correct: false,
});

const CreateTopic = ({ premade }: { premade: boolean }) => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<Question[]>(
    Array(numQuestions).fill(null).map(emptyQuestion)
  );
  const token = sessionStorage.getItem("User")
  if (token) {
    const decodedToken = jwt_decode.jwtDecode<{ _id: string }>(token)
  }
  useEffect(() => { //load updated information if updating topic
    async function loadPost() {
      if (!premade || !id) return;
      const data: Topic = await getTopic(id);
      setTitle(data.title);
      setDescription(data.description);
      setContent(data.content);
      setNumQuestions(data.questions.length)
      setQuestions(
        data.questions.map((q) => ({
          prompt: q.prompt,
          type: q.type,
          answers: q.answers,
          correct: q.correct,
        })))
    }

    loadPost();
  }, [])

  useEffect(() => {
    //determine number of questions
    setQuestions((prev) => {
      const next = [...prev];
      if (next.length < numQuestions) {
        // Add empty questions
        for (let i = next.length; i < numQuestions; i++) {
          next.push(emptyQuestion());
        }
      } else if (next.length > numQuestions) {
        // Remove extra questions
        next.length = numQuestions;
      }
      return next;
    });
  }, [numQuestions]);

  function handleTypeChange(i: number, newType: "truefalse" | "multiple") {
    setQuestions(prev => {
      const next = [...prev];
      if (newType === "truefalse") {
        next[i] = {
          ...next[i],
          type: "truefalse",
          answers: [true, false],
          correct: false,
        };
      } else {
        next[i] = {
          ...next[i],
          type: "multiple",
          answers: ['', '', '', ''],
          correct: '',
        };
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    for (const [idx, q] of questions.entries()) {
      if (q.type === "multiple") {
        const answers = (q.answers as string[]).map(ans => ans.trim());
        const nonEmpty = answers.filter(ans => ans !== "");
        const unique = new Set(nonEmpty);
        if (nonEmpty.length !== unique.size) {
          alert(`Duplicate answers found in Question ${idx + 1}. Please ensure all answers are unique.`);
          return;
        }
      }
    }

    let submitObject = {
      title: title,
      description: description,
      content: content,
      dateCreated: new Date(),
      questions
    }

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

  return (
    <form onSubmit={handleSubmit}>
      <div className='topic-info'>
        <h2>Topic Information</h2>
        
        <div className='header title'>
          <label>Topic Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className='header description'>
          <label>Topic Description:</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='header content'>
          <label>Topic Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className='header questionNum'>
          <label>
            Number of Questions: {numQuestions}
            
          </label>
          <input
              type="range"
              min={3}
              max={9}
              value={numQuestions}
              onChange={e => setNumQuestions(Number(e.target.value))}
            />
        </div>
        <button type="submit">Submit</button>
      </div>

      {questions.map((q, i) => (
        <div className='questions'>
          <div key={i} className="question-block">
            <label>Question {i + 1}:</label>
            <input
              value={q.prompt}
              onChange={e =>
                setQuestions(prev => {
                  const next = [...prev];
                  next[i] = { ...next[i], prompt: e.target.value };
                  return next;
                })
              }
              required
            />

            <label>
              Type:
              <select
                value={q.type}
                onChange={e =>
                  handleTypeChange(i, e.target.value as "truefalse" | "multiple")
                }
              >
                <option value="truefalse">True/False</option>
                <option value="multiple">Multiple Choice</option>
              </select>
            </label>

            {q.type === "truefalse" && (
              <div className="true-false">
                <label className="label">Correct answer&nbsp;</label>
                <label>
                  <input
                    type="radio"
                    name={`correct-${i}`}
                    value="true"
                    checked={q.correct === true}
                    onChange={() =>
                      setQuestions(prev => {
                        const next = [...prev];
                        next[i] = { ...next[i], correct: true };
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
                    name={`correct-${i}`}
                    value="false"
                    checked={q.correct === false}
                    onChange={() =>
                      setQuestions(prev => {
                        const next = [...prev];
                        next[i] = { ...next[i], correct: false };
                        return next;
                      })
                    }
                    required
                  />
                  False
                </label>
              </div>
            )}

            {q.type === "multiple" && Array.isArray(q.answers) && typeof q.answers[0] === "string" && (
              <div className="multiple-choice">
                {[0, 1, 2, 3].map(j => (
                  <div key={j}>
                    <label>Answer {j + 1}:</label>
                    <input
                      value={(q.answers as string[])[j]}
                      onChange={e =>
                        setQuestions(prev => {
                          const next = [...prev];
                          const answers = [...(next[i].answers as string[])];
                          answers[j] = e.target.value;
                          next[i] = { ...next[i], answers };
                          return next;
                        })
                      }
                      required
                    />
                  </div>
                ))}
                <label>
                  Correct Answer:
                  <select
                    value={q.correct === '' ? '' : String(q.correct)}
                    onChange={e =>
                      setQuestions(prev => {
                        const next = [...prev];
                        next[i] = { ...next[i], correct: Number(e.target.value) };
                        return next;
                      })
                    }
                    required
                  >
                    <option value="">Select</option>
                    {[0, 1, 2, 3].map(idx => (
                      <option key={idx} value={idx}>
                        {`Answer ${idx + 1}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
          </div>
        </div>
      ))}



    </form>
  );
};

export default CreateTopic;
