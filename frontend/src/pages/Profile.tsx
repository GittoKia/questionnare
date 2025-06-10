import TopicCard from "../components/TopicCard";
import type { Topic, User } from "../types";
import { useState, useEffect } from "react";
import { getTopics, getUser } from "../api";
import * as jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.scss";
import { convertDate } from "../types";

const Profile = () => {
  const [myTopics, setMyTopics] = useState<Topic[]>([]);
  const [visitedTopics, setVisitedTopics] = useState<Topic[]>([]);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      if (token) {
        const decodedToken = jwt_decode.jwtDecode<{ _id: string }>(token);
        const decodedUser = await getUser(decodedToken._id);
        const allPosts = await getTopics();
        const filteredPosts = allPosts.filter(
          (topic: Topic) => topic.author === decodedUser._id
        );
        const scoredPosts = allPosts.filter((topic: Topic) =>
          decodedUser.visitedPosts?.some(([id]: string) => id === topic._id)
        );
        setMyTopics(filteredPosts);
        setVisitedTopics(scoredPosts);
        setUser(decodedUser);
      }
    }
    loadUserData();
  }, []);

  async function handleUpdate(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const token = sessionStorage.getItem("User");
    if (token) {
      const decodedToken = jwt_decode.jwtDecode<{ _id: string }>(token);
      navigate(`/profile/${decodedToken._id}/update`);
    } else {
      navigate("/");
    }
  }

  if (!user) return null;

  const isEmpty = myTopics.length === 0 && visitedTopics.length === 0;

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__info">
          <label>Name:</label>
          <h1>{user.name}</h1>

          <label>Email:</label>
          <h2>{user.email}</h2>

          <label>Join Date:</label>
          <h2>{convertDate(user.dateCreated)}</h2>
        </div>

        <button className="profile__updateBtn" onClick={handleUpdate}>
          Update Profile
        </button>
      </div>

      {isEmpty && (
        <p className="profile__empty">
          
        </p>
      )}

      {myTopics.length > 0 && (
        <>
          <h3 className="sectionTitle">My Topics</h3>
          <div className="topicList">
            {myTopics.map((t) => (
              <TopicCard key={t._id} topic={t} />
            ))}
          </div>
        </>
      )}

      {visitedTopics.length > 0 && (
        <>
          <h3 className="sectionTitle">Visited</h3>
          <div className="visitedList">
            {visitedTopics.map((t) => (
              <div key={t._id} className="visitedItem">
                <TopicCard topic={t} />
                <p className="visitedScore">
                  {user.visitedPosts?.find(([id]) => id === t._id)?.[1]}/
                  {user.visitedPosts?.find(([id]) => id === t._id)?.[2]}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
