import { Link } from "react-router-dom";
import "./NavBar.css";
import { useAtom } from "jotai";
import { userAtom } from "../App";

function NavBar() {
  const [login, setLogin] = useAtom(userAtom);

  return (
    <div className="navbar-container">
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
        </>
      )}
    </div>
  );
}
export default NavBar;
