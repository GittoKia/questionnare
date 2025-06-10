import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTopic } from '../api';
import type { Topic, Question } from '../types';
import '../styles/Question.scss';

const Question = () => {
  const { id, q } = useParams<{ id: string; q: string }>();
  const navigate = useNavigate();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<null | boolean | number>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getTopic(id);
      setTopic(data);
    })();
    setAnswered(false);
    setSelected(null);
    setWasCorrect(null);
  }, [id, q]);

  if (!topic) return null;

  const index = Number(q) - 1;
  const current = topic.questions[index];
  if (!current) return <p>No more questions.</p>;

  const handlePress = (guess: boolean | number) => {
    if (answered) return;
    setSelected(guess);
    const isCorrect = guess === current.correct;
    setWasCorrect(isCorrect);
    setAnswered(true);
    toast[isCorrect ? 'success' : 'error'](isCorrect ? 'Correct!' : 'Incorrect.');
    if (isCorrect) setCorrect(c => c + 1);
  };

  const handleContinue = () => {
    const nextQ = Number(q) + 1;
    if (nextQ <= topic.questions.length) {
      navigate(`/topic/${topic._id}/question/${nextQ}`, { state: { correct } });
    } else {
      navigate(`/topic/${topic._id}/result`, {
        state: { correct, total: topic.questions.length, solverId: topic.author },
      });
    }
  };

  // Helper to determine button class
  const getButtonClass = (val: boolean | number) => {
    if (!answered) return '';
    if (val === current.correct) return 'correct-answer'; // always green border
    if (val === selected && selected !== current.correct) return 'wrong-answer'; // red border if selected and wrong
    return '';
  };

  return (
    <div className="question">
      <h2 className="question__prompt">{current.prompt}</h2>
      <div className="buttons">
        {current.type === "truefalse" ? (
          <>
            <button
              className={`tfTrue ${getButtonClass(true)}`}
              onClick={() => handlePress(true)}
              disabled={answered}
            >
              True
            </button>
            <button
              className={`tfFalse ${getButtonClass(false)}`}
              onClick={() => handlePress(false)}
              disabled={answered}
            >
              False
            </button>
          </>
        ) : current.type === "multiple" ? (
          (current.answers as string[]).map((ans, idx) => (
            <button
              key={idx}
              className={getButtonClass(idx)}
              onClick={() => handlePress(idx)}
              disabled={answered}
            >
              {ans}
            </button>
          ))
        ) : null}
      </div>
      {answered && (
        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      )}
      <p className="progress">
        Question {q} / {topic.questions.length}
      </p>
    </div>
  );
};

export default Question;