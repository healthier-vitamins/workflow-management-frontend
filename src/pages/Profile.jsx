import { useAtom } from "jotai";
import { userAtom } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {
  const [login, setLogin] = useAtom(userAtom);
  let navigate = useNavigate();

  // prevent direct url access
  if (login?.email === undefined) {
    useEffect(() => {
      navigate("/login");
    }, []);
    return;
  }

  const [editState, setEditState] = useState(false);
  const [editCredents, setEditCredents] = useState({ ...login });

  function handleChange(e) {
    const { name, value } = e.target;
    setEditCredents({
      ...editCredents,
      [name]: value,
    });
  }

  function handleEdit() {
    fetch(
      `https://workflow-management-backend.herokuapp.com/update-user/${login["id"]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCredents),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLogin(data);
      });
    setEditState(false);
  }

  function handlePassword() {
    return;
  }

  function handleDeleteAcc() {
    fetch(
      `https://workflow-management-backend.herokuapp.com/delete-user/${login["id"]}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLogin({});
        alert(data.status);
        navigate("/");
      });
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
            <button onClick={() => setEditState(false)}>Cancel Edits</button>
          </>
        ) : (
          <>
            <p>First name: {login["first_name"]} </p>
            <p>Last name: {login["last_name"]}</p>
            <p>Email: {login["email"]}</p>

            <button onClick={() => setEditState(true)}>Edit Credentials</button>
          </>
        )}
        <p>Job Role: {login["job_position"]}</p>
        <p>Current Workflow: {login["current_workflow"]}</p>
        <button onClick={handlePassword}>Change Password</button>
        <button onClick={handleDeleteAcc}>Delete Account</button>
      </div>
    </div>
  );
}
export default Profile;
