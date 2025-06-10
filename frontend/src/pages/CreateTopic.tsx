import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTopic, getTopic, updateTopic } from '../api';
import type { Topic, Question } from '../types';
import * as jwt_decode from 'jwt-decode';
import '../styles/CreateTopic.scss';

// ------------- helpers -----------------
const emptyQuestion = (): Question => ({
  prompt: '',
  type: 'truefalse',
  answers: [true, false],
  correct: false,
});
// ---------------------------------------

const CreateTopic = ({ premade }: { premade: boolean }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /* ──────────────────────────── state ─ */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<Question[]>(
    Array(5).fill(null).map(emptyQuestion)
  );

  /* ─────────────────── get user id ──── */
  const token = sessionStorage.getItem('User');
  if (token) jwt_decode.jwtDecode<{ _id: string }>(token);

  /* ─────────────── load post for edit ─ */
  useEffect(() => {
    async function loadPost() {
      if (!premade || !id) return;
      const data: Topic = await getTopic(id);
      setTitle(data.title);
      setDescription(data.description);
      setContent(data.content);
      setNumQuestions(data.questions.length);
      setQuestions(
        data.questions.map(q => ({
          prompt: q.prompt,
          type: q.type,
          answers: q.answers,
          correct: q.correct,
        }))
      );
    }
    loadPost();
  }, []);

  /* ───────── adjust # of question objs ─ */
  useEffect(() => {
    setQuestions(prev => {
      const next = [...prev];
      if (next.length < numQuestions) {
        for (let i = next.length; i < numQuestions; i++) next.push(emptyQuestion());
      } else if (next.length > numQuestions) {
        next.length = numQuestions;
      }
      return next;
    });
  }, [numQuestions]);

  /* ─────────────── helpers ──────────── */
  function handleTypeChange(i: number, newType: 'truefalse' | 'multiple') {
    setQuestions(prev => {
      const next = [...prev];
      next[i] =
        newType === 'truefalse'
          ? { ...next[i], type: 'truefalse', answers: [true, false], correct: false }
          : { ...next[i], type: 'multiple', answers: ['', '', '', ''], correct: '' };
      return next;
    });
  }

  /* ───────────── submit ─────────────── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // deduplicate multiple‑choice answers
    for (const [idx, q] of questions.entries()) {
      if (q.type === 'multiple') {
        const answers = (q.answers as string[]).map(a => a.trim());
        const nonEmpty = answers.filter(Boolean);
        if (nonEmpty.length !== new Set(nonEmpty).size) {
          alert(`Duplicate answers in Question ${idx + 1}.`);
          return;
        }
      }
    }

    const submitObject = {
      title,
      description,
      content,
      dateCreated: new Date(),
      questions,
    };

    try {
      if (!premade || !id) await createTopic(submitObject);
      else await updateTopic(id, submitObject);
      navigate('/home');
    } catch {
      // (optional) toast/snackbar
    }
  }
  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value, 10);
    setNumQuestions(n);

    // NEW: update CSS var so the gradient moves
    e.target.style.setProperty("--val", String(n));
  };

  /* ────────────── JSX ───────────────── */
  return (
    <form className="create-topic" onSubmit={handleSubmit}>
      {/* ───────────── sidebar ─────────── */}
      <aside className="topic-info">
        <h2>Topic Information</h2>

        <div className="field">
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required maxLength={50}/>
        </div>

        <div className="field">
          <label>Description</label>
          <input value={description} onChange={e => setDescription(e.target.value)} required maxLength={80}/>
        </div>

        <div className="field">
          <label>Content</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} required maxLength={400}/>
        </div>

        <div className="field slider">
          <label htmlFor="qRange">
            Number of Questions: &nbsp;{numQuestions}
          </label>

          <input
            id="qRange"
            type="range"
            min={3}
            max={9}
            step={1}
            value={numQuestions}
            /* initial paint */
            style={{ '--val': String(numQuestions) } as React.CSSProperties}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              setNumQuestions(n);
              e.target.style.setProperty('--val', String(n));  // keep bar in sync
            }}
          />
        </div>

        <button type="submit" className="primary">Submit</button>
      </aside>

      {/* ─────────── questions area ─────── */}
      <section className="questions-wrapper">
        <h2>Questions</h2>
        <div className="questions-grid">
          {questions.map((q, i) => (
            <div key={i} className="question-block">
              <label>Question {i + 1}</label>
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
                maxLength={150}
              />

              <label className="small">Type</label>
              <select
                value={q.type}
                onChange={e => handleTypeChange(i, e.target.value as 'truefalse' | 'multiple')}
              >
                <option value="truefalse">True/False</option>
                <option value="multiple">Multiple Choice</option>
              </select>

              {/* true/false */}
              {q.type === 'truefalse' && (
                <div className="true-false">
                  <span className="small">Correct answer</span>
                  {([true, false] as const).map(val => (
                    <label key={String(val)}>
                      <input
                        type="radio"
                        name={`correct-${i}`}
                        value={String(val)}
                        checked={q.correct === val}
                        onChange={() =>
                          setQuestions(prev => {
                            const next = [...prev];
                            next[i] = { ...next[i], correct: val };
                            return next;
                          })
                        }
                        required
                      />
                      {String(val)}
                    </label>
                  ))}
                </div>
              )}

              {/* multiple choice */}
              {q.type === 'multiple' && (
                <div className="multiple-choice">
                  {[0, 1, 2, 3].map(j => (
                    <div key={j}>
                      <label>Answer {j + 1}</label>
                      <input
                        value={(q.answers as string[])[j]}
                        onChange={e => {
                          setQuestions(prev => {
                            const next = [...prev];                              // clone array
                            const answers = [...(next[i].answers as string[])];  // clone answers
                            answers[j] = e.target.value;                         // update that slot
                            next[i] = { ...next[i], answers };                   // replace question
                            return next;                                         // commit
                          });
                        }}
                        required
                        maxLength={40}

                      />
                    </div>
                  ))}

                  {/* NEW wrapper – keeps label + select together */}
                  <div className="correct-ans">
                    <label className="small">Correct answer</label>
                    <select
                      value={q.correct === '' ? '' : String(q.correct)}
                      onChange={e => {
                        setQuestions(prev => {
                          const next = [...prev];
                          next[i] = { ...next[i], correct: Number(e.target.value) }; // store index 0‑3
                          return next;
                        });
                      }}
                      required
                    >
                      <option value="">Select</option>
                      {[0, 1, 2, 3].map(idx => (
                        <option key={idx} value={idx}>{`Answer ${idx + 1}`}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </form>
  );
};

export default CreateTopic;
