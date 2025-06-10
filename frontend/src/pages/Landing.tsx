import { useState } from "react";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import "../styles/Auth.scss";          // ← one import covers both
import "../styles/Landing.scss";       // (keep if you still need top‑level tweaks)

const Landing = () => {
  const [view, setView] = useState<"login" | "signup">("login");
  const toggle = () => setView(view === "login" ? "signup" : "login");

  return (
    <div className="auth">
      <h1 className="auth__title">
        {view === "login" ? "Sign In" : "Create Account"}
      </h1>

      <div className="auth__card">
        {view === "login" ? (
          <Login onSwitch={toggle} />
        ) : (
          <CreateUser onSwitch={toggle} />
        )}
      </div>
    </div>
  );
};
export default Landing;
