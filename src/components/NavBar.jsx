import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";

function NavBar() {
  const [login, setLogin] = useAtom(userAtom);
  let navigate = useNavigate();

  function handleClick() {
    setLogin();
    navigate("/");
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {login?.["email"] === undefined ? (
          <>
            <Link to="/register-account">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/stock-list">Stock List</Link>
            <Link to="/profile-page">Profile</Link>
            <div className="navbar-right">
              <button onClick={handleClick}>Logout</button>
            </div>
          </>
        )}
      </nav>
    </>
  );
}
export default NavBar;
