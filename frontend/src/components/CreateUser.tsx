import { createUser, verifyUser } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Auth.scss";
import axios from "axios"
const CreateUser: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
  try {
    let response = await createUser(user);

    // If we get here, user was created successfully
    let login = await verifyUser(user);
    if (response && login) {
      sessionStorage.setItem("User", login);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response}`;
      navigate("/home");
    } else {
      alert("User account couldn't be created");
    }
  } catch (error: any) {
    // Axios puts the server response in error.response
    if (
      error.response &&
      error.response.data &&
      error.response.data.success === false &&
      error.response.data.message === "The email is taken"
    ) {
      alert("User account has the same email as someone else.");
    } else {
      alert("An error occurred during sign up.");
    }
  }
  }

  function handleChange(e: { target: { name: any; value: any } }) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <input
        className="auth__input"
        placeholder="Name"
        onChange={handleChange}
        name="name"
        required
        maxLength={20}
      />
      <input
        className="auth__input"
        placeholder="Email"
        onChange={handleChange}
        name="email"
        maxLength={30}
        required
      />
      <input
        className="auth__input"
        placeholder="Password"
        onChange={handleChange}
        name="password"
        type="password"
        maxLength={20}
        required
      />

      <div className="auth__buttons">
        <button type="submit" className="auth__submit">Sign Up</button>
        <button type="button" className="auth__switch" onClick={onSwitch}>
          Sign In
        </button>
      </div>
    </form>
  );
}

export default CreateUser