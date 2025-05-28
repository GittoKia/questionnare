
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import topicsData from '../topics.json';
import type { Topic } from '../types';
import '../styles/Question.scss'

const Question = () => {
  /* 1. pull both route params */
  const { id, q } = useParams<{ id: string; q: string }>();
  const navigate = useNavigate();
  const [correct, setCorrect] = useState(0);

  /* 2. look up the topic by id */
  const topic: Topic | undefined = topicsData.topics.find(
    (t: Topic) => t.id === Number(id)
  );

  if (!topic) return <p>Topic not found.</p>;

  /* 3. decide which question we’re on */
  const index = Number(q) - 1; // 0,1,2,3,4
  const current = topic.questions[index];
  if (!current) return <p>No more questions for this topic.</p>;

  /* 4. handle button clicks */
  const handlePress = (guess: boolean) => {
    if (guess === current.answer) {
      toast.success('Correct!');
      setCorrect((c) => c + 1);   
    } else {
      toast.error('Incorrect.');
    }

    const nextRouteNumber = Number(q) + 1;            // stay 1‑based in the URL
    if (nextRouteNumber <= topic.questions.length) {
      navigate(`/topic/${topic.id}/question/${nextRouteNumber}`,{state:{correct}});

    } else {
      navigate(`/topic/${topic.id}/result`,{
        state: { correct: guess === current.answer ? correct + 1 : correct, total: topic.questions.length },
      }); // back to article (or summary page)
    }
  };

  /* 5. render */
  return (
    <div className="topic">
      <h2>{current.prompt}</h2>

      <div className="buttons">
        <button onClick={() => handlePress(true)}>True</button>
        <button onClick={() => handlePress(false)}>False</button>
      </div>

      <p>
        Question {q} / {topic.questions.length}
      </p>
    </div>
  );
};

export default Question;
