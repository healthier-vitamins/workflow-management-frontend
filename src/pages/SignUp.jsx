import { useState } from "react";
import { userAtom } from "../App";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let navigate = useNavigate();
  const [login, setLogin] = useAtom(userAtom);
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
        setLogin(data);
        if (data.status) {
          alert(data.status);
          navigate("/register-account");
        } else {
          navigate("/");
        }
      });
  }

  return (
    <>
      <h2>Sign Up</h2>

      <form onSubmit={(e) => e.preventDefault()} className="signup-form">
        <fieldset>
          <div className="signup-box">
            <div className="signup-left">
              <label htmlFor="first_name">First Name</label>
              <br />
              <br />
              <label htmlFor="last_name">Last Name</label>
              <br />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <br />
              <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="signup-right">
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
              <br />
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
              <br />
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
              <br />
              <input
                onChange={handleChange}
                required
                type="password"
                name="password"
                id="password"
                value={entry.password}
                placeholder="Password"
              ></input>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}
export default SignUp;
