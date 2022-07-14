import { useState } from "react";
import { userAtom } from "../App";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let navigate = useNavigate()
  const [login, setLogin] = useAtom({ userAtom });
  const [entry, setEntry] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEntry({
      ...entry,
      [name]: value,
    });
  }

  function handleSubmit() {
    fetch("https://workflow-management-backend.herokuapp.com/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => response.json())
      .then((data) => {
        setLogin(data)
        if (!login) {
          return "Loading";
        } else {
          if (login.error) {
            alert(login.error)
            navigate('/register-account')
          }
          navigate('/')
        }
      });
  }

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <div className="signup-container">
        <form onSubmit={(e) => e.preventDefault()} className="signup-form">
          <fieldset>
            <label htmlFor="first_name">First Name</label>
            <input
              onChange={handleChange}
              required
              type="text"
              name="first_name"
              id="first_name"
              value={entry.first_name}
              placeholder="First Name"
            ></input>
            <br />

            <label htmlFor="last_name">Last Name</label>
            <input
              onChange={handleChange}
              required
              type="text"
              name="last_name"
              id="last_name"
              value={entry.last_name}
              placeholder="Last Name"
            ></input>
            <br />

            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              required
              type="email"
              name="email"
              id="email"
              value={entry.email}
              placeholder="Email"
            ></input>
            <br />

            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              required
              type="password"
              name="password"
              id="password"
              value={entry.password}
              placeholder="Password"
            ></input>
            <br />

            <button onClick={handleSubmit}>Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
