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
            <div className="profile-box">
              <div className="profile-left">
                <label htmlFor="first_name" className="label-field">First Name:</label>
                <br />
                <br />
                <label htmlFor="last_name" className="label-field">Last Name:</label>
                <br />
                <br />
                <label htmlFor="email" className="label-field">Email:</label>
                <br />
                <br />
                <button onClick={handleEdit}>Submit Changes</button>

                <button onClick={() => setEditState(false)}>Cancel</button>
              </div>
              <div className="profile-right">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={editCredents["first_name"]}
                  onChange={handleChange}
                  
                />
                <br />
                <br />
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={editCredents["last_name"]}
                  onChange={handleChange}
                />
                <br />
                <br />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={editCredents["email"]}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="profile-box">
              <div className="profile-left">
                <p>First name: </p>
                <p>Last name: </p>
                <p>Email: </p>
                <button onClick={() => setEditState(true)}>
                  Edit Credentials
                </button>
              </div>
              <div className="profile-right">
                <p>{login["first_name"]} </p>
                <p>{login["last_name"]}</p>
                <p>{login["email"]}</p>
              </div>
            </div>
          </>
        )}
        <div className="profile-box">
          <div className="profile-left">
            <p>Job Role: </p>
            <p>Current Workflow: </p>
          </div>
          <div className="profile-right">
            <p>{login["job_position"]}</p>
            <p>{login["current_workflow"]}</p>
          </div>
        </div>

        {changePasswordState ? (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="profile-box">
                <div className="profile-left">
                  <label htmlFor="old_password" className="label-field">Enter old password:</label>
                  <br />
                  <br />
                  <label htmlFor="new_password_first" className="label-field">Enter new password</label>
                  <br />
                  <br />
                  <label htmlFor="new_password_second" className="label-field">
                    Enter new password again
                  </label>
                  <br />
                  <br />
                  <button onClick={handlePassword}>Confirm</button>
                  <button onClick={() => setChangePasswordState(false)}>
                    Cancel
                  </button>
                </div>
                <div className="profile-right">
                  <input
                    id="old_password"
                    name="old_password"
                    type="password"
                    value={passwordCredents["old_password"]}
                    onChange={handlePwChange}
                  ></input>
                  <br />
                  <br />
                  <input
                    id="new_password_first"
                    name="new_password_first"
                    type="password"
                    value={passwordCredents["new_password_first"]}
                    onChange={handlePwChange}
                  ></input>
                  <br />
                  <br />
                  <input
                    id="new_password_second"
                    name="new_password_second"
                    type="password"
                    value={passwordCredents["new_password_second"]}
                    onChange={handlePwChange}
                  ></input>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="profile-box">
            <button onClick={() => setChangePasswordState(true)}>
              Change Password
            </button>
          </div>
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
