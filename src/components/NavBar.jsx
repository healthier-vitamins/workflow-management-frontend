import { Link } from "react-router-dom"
import "./NavBar.css"

function NavBar() {
    return (
        <div className="navbar-container">
            <Link to="/">Home</Link>
            <Link to="/stock-list">Stock List</Link>
            <Link to="/register-account">Sign Up</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile-page">Profile</Link>
        </div>
    )
}
export default NavBar