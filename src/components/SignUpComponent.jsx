import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent"

const SignUpComponent = () => {
    let [username, updateUsername] = useState("");
    let [email, updateEmail] = useState("");
    let [phone, updatePhone] = useState("");
    let[password, updatePassword] = useState("");

    let[loading,setLoading] = useState("");
    let[error, setError] = useState("");
    let[success, setSuccess] = useState("");

    const handleSubmit =async(e) => {
        e.preventDefault();

        // alert user
        setError("");
        setSuccess("");
        setLoading("Submitting data! Please wait...")

    



        console.log(username,email,phone,password);

        // try send data to backend api
        try {
            // create form data
            const user_data = new FormData();
            user_data.append("username", username);
            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);

            const response = await axios.post("https://duncanm.alwaysdata.net/api/signup", user_data)
            console.log(response);
            setSuccess(response.data.message);
            setLoading("");
        } catch (error) {
            console.log(error);
            setLoading("")
            setError(error.message);
            
        }

    };
    

    return (
        <div className="row justify-content-center mt-4">
            
            
            <div className="col-md-6 card shadow p-4">
                <h2>Create Account</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form onSubmit={handleSubmit}>
                        <input type="text"
                         className="form-control my-3" 
                         placeholder="Enter Username" 
                         onChange={(e) => {updateUsername(e.target.value)}}  
                         required 
                         value={username}/>

                        <input type="email" 
                        className="form-control my-3" 
                        placeholder="Enter Email" 
                        onChange={(e) => {updateEmail(e.target.value)}} 
                        required 
                        value={email}/> 

                        <input type="tel" 
                        className="form-control my-3" 
                        placeholder="Enter Phone" 
                        onChange={(e)=>{updatePhone(e.target.value)}} 
                        required 
                        value={phone}/> 

                        <input type="password" 
                        className="form-control my-3" 
                        placeholder="Enter Password" 
                        onChange={(e)=>{updatePassword(e.target.value)}} 
                        required 
                        value={password} /> 

                        <button className="btn btn-success my-3">Sign Up</button> <br />
                        <Link to="/signin">Already have an account? Sign In</Link>
                   
                </form>
            </div>
        </div>
    );
}

export default SignUpComponent;
