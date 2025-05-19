import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/movies" className="nav-link">
        Movies
      </Link>
    </nav>
  );
}
