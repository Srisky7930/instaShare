import {Link} from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import './index.css'

const Header = () => (
  <nav className="navbar-container">
    <div className="navbar-logo-container">
      <div>
        <img
          src="https://res.cloudinary.com/dfqkajd1a/image/upload/v1672733292/Standard_Collection_8_hkeehs.png"
          alt="website logo"
          className="website-logo"
        />
      </div>
      <div>
        <h1> Insta share </h1>
      </div>
    </div>
    <div className="menu-logo">
      <button type="button">
        <AiOutlineMenu />
      </button>
    </div>
    <div>
      <div className="nav-links-items">
        <ul className="nav-links">
          <Link to="/">
            <li className="link-item"> Home </li>
          </Link>
          <Link to="/">
            <li className="link-item"> profile </li>
          </Link>
          <button type="button" className="logout-button">
            Logout
          </button>
        </ul>
      </div>
    </div>
  </nav>
)

export default Header
