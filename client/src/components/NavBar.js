import { Link } from 'react-router-dom';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          Home
        </Link>
      </div>

      <div className="navbar-end">
        {
          // if local storage has token, show logout button
          // else show login button
          localStorage.getItem('ACCESS_TOKEN_KEY') ? (
            <div
              className="navbar-item"
              onClick={() => {
                try {
                  localStorage.removeItem('ACCESS_TOKEN_KEY');
                  window.location.href = '/login';
                } catch (error) {
                  handleError(error.message);
                }
              }}
            >
              Logout
            </div>
          ) : (
            <Link className="navbar-item" to="/login">
              Login
            </Link>
          )
        }
      </div>
    </nav>
  );
}

export default NavBar;
