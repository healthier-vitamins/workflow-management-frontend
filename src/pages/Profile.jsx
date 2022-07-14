import { useAtom } from "jotai";
import { userAtom } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {
  const [login, setLogin] = useAtom(userAtom);
  let navigate = useNavigate();
  if (login?.email === undefined) {
    useEffect(() => {
      navigate("/login");
    }, []);
    return;
  }

  const [editState, seteditState] = useState(false);
  const [editCredents, setEditCredents] = useState({ ...login });

  function handleChange(e) {
    const { name, value } = e.target;
    setEditCredents({
      ...editCredents,
      [name]: value,
    });
  };

  function handleEdit() {
    fetch(
      `https://workflow-management-backend.herokuapp.com/update-user/${login["id"]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(edit),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLogin(data);
      });
    seteditState(false);
  };

  function handlePassword() {
    return 
  }

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      <div className="profile-container">
        {editState ? (
          <>
            <label htmlFor="first_name">First Name:</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={editCredents["first_name"]}
              onChange={handleChange}
            />
            <label htmlFor="last_name">Last Name:</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={editCredents["last_name"]}
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={editCredents["email"]}
              onChange={handleChange}
            />
            <button onClick={handleEdit}>Submit Changes</button>
            <button onClick={() => seteditState(false)}>Cancel Edits</button>
          </>
        ) : (
          <>
            <p>First name: {login["first_name"]} </p>
            <p>Last name: {login["last_name"]}</p>
            <p>Email: {login["email"]}</p>

            <button onClick={() => seteditState(true)}>Edit Credentials</button>
          </>
        )}
      </div>
      <p>Job Role: {login["job_position"]}</p>
      <p>Current Workflow: {login["current_workflow"]}</p>
      <button onClick={handlePassword}>Change Password</button>
    </div>
  );
}
export default Profile;
