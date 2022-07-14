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
  const [deleteState, setDeleteState] = useState(false);
  const [editCredents, setEditCredents] = useState({ ...login });

  const [changePasswordState, setChangePasswordState] = useState(false);
  const [passwordCredents, setPasswordCredents] = useState({
    old_password: "",
    new_password_first: "",
    new_password_second: "",
  });

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

  function handlePwChange(e) {
    const { name, value } = e.target;
    setPasswordCredents({
      ...passwordCredents,
      [name]: value,
    });
  }

  function handlePassword() {
    if (
      passwordCredents.new_password_first !==
      passwordCredents.new_password_second
    ) {
      alert("New passwords do not match");
      setPasswordCredents({
        old_password: "",
        new_password_first: "",
        new_password_second: "",
      });
    } else {
      fetch(
        `https://workflow-management-backend.herokuapp.com/change-password/${login["id"]}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordCredents),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setLogin(data);
          if (!login) {
            return "Loading";
          } else {
            setChangePasswordState(false);
            alert("Password changed");
          }
        });
    }
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
    setDeleteState(false);
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
            <button onClick={() => setEditState(false)}>Cancel</button>
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

        {changePasswordState ? (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              <fieldset>
                <label htmlFor="old_password">Enter old password:</label>
                <input
                  id="old_password"
                  name="old_password"
                  type="password"
                  value={passwordCredents["old_password"]}
                  onChange={handlePwChange}
                ></input>
                <br />
                <label htmlFor="new_password_first">Enter new password</label>
                <input
                  id="new_password_first"
                  name="new_password_first"
                  type="password"
                  value={passwordCredents["new_password_first"]}
                  onChange={handlePwChange}
                ></input>
                <br />
                <label htmlFor="new_password_second">
                  Enter new password again
                </label>
                <input
                  id="new_password_second"
                  name="new_password_second"
                  type="password"
                  value={passwordCredents["new_password_second"]}
                  onChange={handlePwChange}
                ></input>
              </fieldset>
            </form>
            <button onClick={handlePassword}>Confirm</button>
            <button onClick={() => setChangePasswordState(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setChangePasswordState(true)}>
            Change Password
          </button>
        )}

        {deleteState ? (
          <>
            <button onClick={handleDeleteAcc}>Confirm</button>
            <button onClick={() => setDeleteState(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setDeleteState(true)}>Delete Account</button>
        )}
      </div>
    </div>
  );
}
export default Profile;
