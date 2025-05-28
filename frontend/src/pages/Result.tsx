import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

type ResultState = { correct: number; total: number };

const Result = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // `state` was attached when we navigated here
  const { state } = useLocation();
  const { correct, total } = (state || {}) as ResultState;

  if (state === null) {
    // user refreshed or hit the URL manually → punt them home
    return <Link to="/">Back to Home</Link>;
  }

  return (
    <div className="mt-8 text-center">
      <h1 className="text-2xl font-bold">
        You got {correct} / {total} right! 🎉
      </h1>

      <div className="mt-6 flex justify-center gap-4">
        {/* play again = start same quiz from Q1 */}
        <button
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white"
          onClick={() => navigate(`/topic/${id}`, { replace: true })}
        >
          Play again
        </button>

        <Link
          to="/"
          className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Result;
