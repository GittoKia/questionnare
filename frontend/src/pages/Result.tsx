import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode'
import type { User } from '../types';
import { updateUser } from '../api';
import { useEffect } from 'react';
type ResultState = { correct: number; total: number };

type ResultProps = { solverId: string };

const Result = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // `state` was attached when we navigated here
  const { state } = useLocation();
  const { correct, total } = (state || {}) as ResultState;
  const {solverId} = (state || {}) as ResultProps;

  if (state === null) {
    // user refreshed or hit the URL manually → punt them home
    return <Link to="/home">Back to Home</Link>;
  }


  const token = sessionStorage.getItem("User");

  useEffect(() => {
    const updateUserData = async () => {
      if (token){
      const decodedUser = jwt_decode.jwtDecode<User>(token);
      console.log((solverId!=decodedUser._id))
      if ((solverId!=decodedUser._id)) {
        
        // Only send the new entry to be appended by the backend
        const newVisitedPost = [id, correct];
        let submitUser = {
          visitedPosts: [newVisitedPost]
        };
        await updateUser(decodedUser._id, submitUser);
      }}
    };
    updateUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          to="/home"
          className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Result;
