import "./Navbar.css";
import { BriefcaseBusiness, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <header className="navbar">

      <div className="left">

        <div className="logo">

          <div className="logo-icon">
            <BriefcaseBusiness size={26} />
          </div>

          <div>
            <h1>JobVault</h1>
          </div>

        </div>

      </div>

      <div className="right">

        <a
          href="https://internshala.com/internships"
          target="_blank"
          rel="noopener noreferrer"
          className="internshala-btn"
        >
          + Browse Internships
        </a>

        <div className="user-info">

          

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;