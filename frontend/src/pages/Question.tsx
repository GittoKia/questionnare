import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTopic } from '../api';
import type { Topic,Question } from '../types';
import '../styles/Question.scss';

const Question = () => {
  /* route parameters */
  const { id, q } = useParams<{ id: string; q: string }>();
  const navigate = useNavigate();

  /* local state */
  const [topic, setTopic] = useState<Topic | null>(null);
  const [correct, setCorrect] = useState(0);

  /* fetch topic once (and if id changes) */
  useEffect(() => {
    (async () => {
      const data = await getTopic(id);
      setTopic(data);
    })();
  }, []);

  /* guard first paint */
  if (!topic) return null;

  /* derive current question */
  const index = Number(q) - 1;          // 0‑based
  const current = topic.questions[index];
  if (!current) return <p>No more questions.</p>;

  /* click handler */
  const handlePress = (guess: boolean|number) => {
    const isCorrect = guess === current.correct;
    toast[isCorrect ? 'success' : 'error'](isCorrect ? 'Correct!' : 'Incorrect.');

    const nextCorrect = correct + (isCorrect ? 1 : 0);
    setCorrect(nextCorrect);

    const nextQ = Number(q) + 1;        // stay 1‑based in URL
    if (nextQ <= topic.questions.length) {
      navigate(`/topic/${topic._id}/question/${nextQ}`, { state: { correct: nextCorrect } });
    } else {
      navigate(`/topic/${topic._id}/result`, {
        state: { correct: nextCorrect, total: topic.questions.length ,solverId:topic.author},
      });
    }
  };

  /* render */
  return (
    <div className="topic">
      <h2>{current.prompt}</h2>

      <div className="buttons">
        {current.type === "truefalse" && Array.isArray(current.answers) && typeof current.answers[0] === "boolean" ? (
          <>
            <button onClick={() => handlePress(true)}>True</button>
            <button onClick={() => handlePress(false)}>False</button>
          </>
        ) : current.type === "multiple" && Array.isArray(current.answers) && typeof current.answers[0] === "string" ? (
          (current.answers as string[]).map((ans, idx) => (
            <button key={idx} onClick={() => handlePress(idx)}>
              {ans}
            </button>
          ))
        ) : null}
      </div>

      <p className="progress">
        Question {q} / {topic.questions.length}
      </p>
    </div>
  );
};

export default Question;
