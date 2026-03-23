import { Link, useNavigate } from "react-router-dom";


const NavbarComponent = () => {
    let user = JSON.parse(localStorage.getItem("user"))

    let navigator = useNavigate ()

    const logout = () => {
        localStorage.clear();
        navigator("/signin");
    };
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">Orient Travellers</Link>
            <button className="navbar-toggler" data-bs-collapse="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/addproduct">Add Product</Link>
                </div>

                {user ?
                    <div className="navbar-nav ms-auto">
                        <p className="nav-link"to="/signin">Sign In {user.Username}</p>
                        <button className="nav-link" onclick={logout}>log out</button>
                    </div>

                    :

                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/signin">Sign In</Link>
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </div>

                }
            </div>
        </nav>

    );
}
export default NavbarComponent;