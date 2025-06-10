import { verifyUser, updateUser, getUser } from "../api"
import { type User, useLogout } from "../types"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../styles/UpdateUser.scss'
const UpdateUser = () => {
    const [basicuser, setBasicUser] = useState({
        email: "",
        password: ""
    })
    const [user, setUser] = useState<User>()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const { id } = useParams<{ id: string }>();
    const logout = useLogout()
    useEffect(() => {
        async function loadPost() {
            const data: User = await getUser(id);
            if (data) {
                setUser(data)
            }
        } loadPost()
    },
        [])


    async function handleSubmit(e: { preventDefault: () => void }) {
        e.preventDefault()
        let response = await verifyUser(basicuser)
        if (response) {
            if (user) {
                if (email && password) {
                    user.email = email
                    user.password = password
                    await updateUser(id, user);
                    logout()
                }

                else {
                    alert("Data retrieval failed")
                }
            }
            else {
                alert("ID failed")
            }
        }
        else {
            alert("Verification Failed")
        }




    }

    function handleChange(e: { target: { name: any; value: any } }) {
        setBasicUser({ ...basicuser, [e.target.name]: e.target.value })
    }

    return (
        <div className="updateUser">
            <div className="updateUser__card">
                <form onSubmit={handleSubmit} className="updateUser__form">
                    <input
                        className="updateUser__input"
                        placeholder="Current Email"
                        onChange={handleChange}
                        name="email"
                        required
                        maxLength={30}
                    />
                    <input
                        className="updateUser__input"
                        placeholder="New Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        maxLength={30}
                    />
                    <input
                        className="updateUser__input"
                        placeholder="Current Password"
                        onChange={handleChange}
                        name="password"
                        type='password'
                        required
                        maxLength={20}
                    />
                    <input
                        className="updateUser__input"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type='password'
                        maxLength={20}
                    />

                    <button type="submit" className="updateUser__submit">
                        Change Information
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser