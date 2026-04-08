import AppleIcon from "@mui/icons-material/Apple";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <AppleIcon className="navbar-icon" />
        <span className="navbar-brand">Apple Clone</span>
      </div>

      <div className="navbar-center">
        <span className="navbar-link">Mac</span>
        <span className="navbar-link">iPhone</span>
        <span className="navbar-link">Support</span>
      </div>

      <div className="navbar-right">
        <SearchIcon className="navbar-icon" />
        <AccountCircleIcon className="navbar-icon" />
        <span className="navbar-link">Admin</span>
      </div>
    </nav>
  );
}

export default Navbar;
