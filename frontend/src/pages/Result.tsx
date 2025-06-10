import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode'
import type { User } from '../types';
import { addToUser } from '../api';
import { useEffect } from 'react';
import '../styles/Result.scss'
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
      const decodedUser = jwt_decode.jwtDecode<{_id:string}>(token);
      console.log((solverId!=decodedUser._id))
      if ((solverId!=decodedUser._id)) {
        
        // Only send the new entry to be appended by the backend
        const newVisitedPost = [id, correct,total];
        let submitUser = {
          visitedPosts: [newVisitedPost]
        };
        console.log(decodedUser._id)
        try{
        await addToUser(decodedUser._id, submitUser);}
        catch{
          console.log('no')
        }
      }}
    };
    updateUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
let emoji = "🎉";
  const ratio = correct / total;
  if (ratio <= 0.25) {
    emoji = "❌";
  } else if (ratio <= 0.75) {
    emoji = "👍";
  } else {
    emoji = "🎉";
  }
 return (
  <div className="result">
    <h1 className="result__score">
      You got {correct} / {total} right! {emoji}
    </h1>

    <div className="result__cta">
      <button
        className="result__button result__button--primary"
        onClick={() => navigate(`/topic/${id}`, { replace: true })}
      >
        Play again
      </button>

      <Link
        to="/home"
        className="result__button result__button--secondary"
      >
        Home
      </Link>
    </div>
  </div>
);
};

export default Result;
