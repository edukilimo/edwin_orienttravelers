import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent"
const SignInComponent = () => {
    let [email, updateEmail] = useState("");
    let [password, updatePassword] = useState("");

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    // hook usenavigate for automatically change the url
    let navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading("Please wait...");

        try {
            // CREATE FORM DATA
            const user_data = new FormData();

            // add the email and password to userdata
            user_data.append("email", email);
            user_data.append("password", password);

            // use axios to send data to server and get response
            const response = await axios.post("https://duncanm.alwaysdata.net/api/signin", user_data)
            console.log(response);
            if (response.data.user) {
                setLoading("");
                setSuccess(response.data.message);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigator("/")
            } else {
                setLoading("");
                setError(response.data.message);
            }
        } catch (error) {
            setLoading("");
            setError(error.message);

        }
    };


    return (
        <div className="row justify-content-center mt-4">
            
    
            <div className="col-md-6 card shadow p-4">
                <h2>Sign In</h2>
                <h5 className="text-warning">{loading}</h5>
             <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form onSubmit={handleSubmit}>
                    <input type="email"
                        className="form-control my-3"
                        placeholder="Enter Email"
                        required
                        onChange={(e) => { updateEmail(e.target.value); }} value={email} />
                    <br />

                    <input type="password"
                        className="form-control my-3"
                        placeholder="Enter password"
                        required onChange={(e) => { updatePassword(e.target.value); }} value={password} />
                    <br />

                    <button className="btn btn-success my-3">Sign In</button> <br />
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </form>

            </div>
        </div>
    );
}

export default SignInComponent;