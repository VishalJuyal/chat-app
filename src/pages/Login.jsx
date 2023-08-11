import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(signInWithEmailAndPassword);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat app </span>
        <span className="title">Log In</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="text" placeholder="password" />
          <button>Sign In</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p>
          Yo don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
