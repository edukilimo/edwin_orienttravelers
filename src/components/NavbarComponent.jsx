import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = ({ logo }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        style={{ 
                            width: '100px', 
                            height: 'auto', 
                            marginRight: '15px', 
                            filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,0.5))' 
                        }} 
                    />
                    Orient Travellers
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button"
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/addproduct">Add Product</Link>
                    </div>

                    {user ? (
                        <div className="navbar-nav ms-auto d-flex align-items-center">
                            <span className="nav-link mb-0 text-light">
                                Welcome, {user.username}
                            </span>
                            <button 
                                className="btn btn-outline-danger btn-sm ms-2" 
                                onClick={logout}
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link" to="/signin">Sign In</Link>
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;