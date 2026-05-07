import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

const SignUpComponent = () => {
    let [username, updateUsername] = useState("");
    let [email, updateEmail] = useState("");
    let [phone, updatePhone] = useState("");
    let [password, updatePassword] = useState("");

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    // 👇 New states
    let [showSuggestions, setShowSuggestions] = useState(false);
    let [showPassword, setShowPassword] = useState(false);

    // Strong generated passwords
    const strongPasswords = [
        "Travel@2026",
        "Safari#458",
        "BeachLife@77",
        "Explore#999",
    ];

    // Password checks
    const hasMinLength = password.length >= 8;

    const hasStrongCharacters =
        /[A-Z]/.test(password) && // Capital letters
        /[a-z]/.test(password) && // Small letters
        /[0-9]/.test(password) && // Numbers
        /[@#$%^&*!]/.test(password); // Special characters

    const isPasswordValid = hasMinLength && hasStrongCharacters;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent signup if password weak
        if (!isPasswordValid) {
            setError("Please create a stronger password.");
            return;
        }

        // alert user
        setError("");
        setSuccess("");
        setLoading("Submitting data! Please wait...");

        console.log(username, email, phone, password);

        try {
            // create form data
            const user_data = new FormData();
            user_data.append("username", username);
            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);

            const response = await axios.post(
                "https://edwink.alwaysdata.net/api/signup",
                user_data
            );

            console.log(response);
            setSuccess(response.data.message);
            setLoading("");
        } catch (error) {
            console.log(error);
            setLoading("");
            setError(error.message);
        }
    };

    return (
        <div className="row justify-content-center mt-4">

            <div className="col-md-6 card shadow-lg border-0 p-4 rounded-4">
                <h2 className="fw-bold mb-3 text-center">Create Account</h2>

                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Enter Username"
                        onChange={(e) => {
                            updateUsername(e.target.value);
                        }}
                        required
                        value={username}
                    />

                    <input
                        type="email"
                        className="form-control my-3"
                        placeholder="Enter Email"
                        onChange={(e) => {
                            updateEmail(e.target.value);
                        }}
                        required
                        value={email}
                    />

                    <input
                        type="tel"
                        className="form-control my-3"
                        placeholder="Enter Phone"
                        onChange={(e) => {
                            updatePhone(e.target.value);
                        }}
                        required
                        value={phone}
                    />

                    {/* PASSWORD SECTION */}
                    <div className="position-relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control my-3"
                            placeholder="Enter Password"
                            onFocus={() => setShowSuggestions(true)}
                            onChange={(e) => {
                                updatePassword(e.target.value);
                            }}
                            required
                            value={password}
                        />

                        {/* Show / Hide */}
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* PASSWORD POPUP */}
                    {showSuggestions && (
                        <div
                            className="card p-3 mb-3 border-0 shadow-sm rounded-4"
                            style={{ background: "#f8f9fa" }}
                        >
                            <h6 className="fw-bold mb-3">
                                Password Requirements
                            </h6>

                            {/* Requirement 1 */}
                            <div className="d-flex align-items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={hasMinLength}
                                    readOnly
                                    className="form-check-input me-2"
                                />

                                <span
                                    className={
                                        hasMinLength
                                            ? "text-success"
                                            : "text-muted"
                                    }
                                >
                                    Minimum 8 characters
                                </span>
                            </div>

                            {/* Requirement 2 */}
                            <div className="d-flex align-items-center mb-3">
                                <input
                                    type="checkbox"
                                    checked={hasStrongCharacters}
                                    readOnly
                                    className="form-check-input me-2"
                                />

                                <span
                                    className={
                                        hasStrongCharacters
                                            ? "text-success"
                                            : "text-muted"
                                    }
                                >
                                    Include uppercase, lowercase, number &
                                    special character (@#$%^&*)
                                </span>
                            </div>

                            {/* Suggested Passwords */}
                            <h6 className="fw-bold">Suggested Strong Passwords</h6>

                            <div className="d-flex flex-wrap gap-2 mt-2">
                                {strongPasswords.map((pass, index) => (
                                    <button
                                        type="button"
                                        key={index}
                                        className="btn btn-outline-success btn-sm rounded-pill"
                                        onClick={() => updatePassword(pass)}
                                    >
                                        {pass}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SIGNUP BUTTON */}
                    <button
                        className="btn btn-success my-3 w-100 rounded-pill"
                        disabled={!isPasswordValid}
                    >
                        Sign Up
                    </button>

                    <div className="text-center">
                        <Link to="/signin">
                            Already have an account? Sign In
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignUpComponent;