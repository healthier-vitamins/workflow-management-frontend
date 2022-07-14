import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../App";

function Login() {
  let navigate = useNavigate();

  const [login, setLogin] = useAtom(userAtom);
  const [entry, setEntry] = useState({
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
    fetch("https://workflow-management-backend.herokuapp.com/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setLogin(data);

        if (data.error) {
          alert(data.error);
          navigate("/login");
        } else {
          navigate("/");
        }
      });
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div className="login-container">
        <form onSubmit={(e) => e.preventDefault()} className="login-form">
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={entry.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <br/>
            <br/>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={entry.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <br/>
            <br/>
            <button onClick={handleSubmit}>Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default Login;
