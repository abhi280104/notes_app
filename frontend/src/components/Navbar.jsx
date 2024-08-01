
import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  const reff = useRef(null)
  const clsref = useRef(null)
  const onclickYes = () => {
    clsref.current.click()
    localStorage.removeItem('token');
    navigate('/login');


  }

  const onclickNo = () => {
    clsref.current.click()

  }

  const handleLogout = () => {
    reff.current.click()
  };

  useEffect(() => {
    console.log(`Current pathname: ${location.pathname}`);
    // Add any other actions you want to perform when the location changes
  }, [location.pathname]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iCloud</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current={location.pathname === '/' ? 'page' : undefined} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? (
              <form className="d-flex" role="search">
                <Link className="btn btn-primary mx-3" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary" to="/signup" role="button">SignUp</Link>
              </form>
            ) : (
              <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
            )}
          </div>
        </div>
      </nav>
      
      <button type="button" className="btn btn-primary" ref={reff}  style={{display:"none"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Exit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you Sure wanna Exit?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clsref} onClick={onclickNo}>No</button>
              <button type="button" className="btn btn-primary" onClick={onclickYes}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
