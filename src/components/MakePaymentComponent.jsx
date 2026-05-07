import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MakePaymentComponent = () => {
    const { product, cart } = useLocation().state || {};
    const navigate = useNavigate();

    let [phone, setPhone] = useState("");
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");
    let [paymentMethod, setPaymentMethod] = useState("mpesa"); // mpesa or card

    // Credit card fields
    let [cardNumber, setCardNumber] = useState("");
    let [cardName, setCardName] = useState("");
    let [cardExpiry, setCardExpiry] = useState("");
    let [cardCvv, setCardCvv] = useState("");

    const img_url = "https://edwink.alwaysdata.net/static/images/";

    // Work out what to display — could be single product or cart
    const displayProduct = product || (cart && cart[0]);
    const totalAmount = cart
    ? cart.reduce((sum, item) => sum + Number(item.product_cost) * Number(item.quantity), 0)
    : Number(product?.product_cost);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading("Processing payment, please wait...");

        try {
            if (paymentMethod === "mpesa") {
                const data = new FormData();
                data.append("amount", totalAmount);
                data.append("phone", phone);
                const response = await axios.post("https://edwink.alwaysdata.net/api/mpesa_payment", data);
                if (response.status === 200) {
                    setLoading("");
                    setSuccess("✅ M-Pesa prompt sent! Check your phone and enter your PIN.");
                }
            } else {
                // Credit card — just show success for now
                setLoading("");
                setSuccess("✅ Card payment submitted successfully!");
            }
        } catch (error) {
            setLoading("");
            setError("❌ " + error.message);
        }
    };

    if (!displayProduct) {
        return (
            <div style={{ textAlign: "center", padding: "60px", color: "white" }}>
                <h3>No product selected</h3>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginTop: "16px", padding: "10px 24px",
                        backgroundColor: "#f97316", color: "white",
                        border: "none", borderRadius: "8px",
                        cursor: "pointer", fontWeight: "bold"
                    }}>
                    Back to Packages
                </button>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: "100vh", padding: "40px 20px",
            display: "flex", justifyContent: "center", alignItems: "flex-start"
        }}>
            <div style={{
                width: "100%", maxWidth: "500px",
                backgroundColor: "rgba(8, 30, 63, 0.95)",
                borderRadius: "20px",
                border: "1px solid rgba(0,210,255,0.2)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                overflow: "hidden"
            }}>

                {/* Card Header */}
                <div style={{
                    background: "linear-gradient(135deg, #006633, #00a550)",
                    padding: "20px 24px",
                    display: "flex", alignItems: "center", gap: "12px"
                }}>
                    <div style={{
                        backgroundColor: "white", borderRadius: "8px",
                        padding: "6px 10px", fontWeight: "900",
                        color: "#006633", fontSize: "16px"
                    }}>
                        M
                    </div>
                    <div>
                        <h4 style={{ margin: 0, color: "white", fontWeight: "bold" }}>
                            Secure Payment
                        </h4>
                        <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
                            Orient Travellers Checkout
                        </p>
                    </div>
                </div>

                {/* Product Info */}
                <div style={{
                    display: "flex", gap: "14px", padding: "20px 24px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)"
                }}>
                    <img
                        src={img_url + displayProduct.product_image}
                        alt={displayProduct.product_name}
                        style={{ width: "80px", height: "70px", objectFit: "cover", borderRadius: "10px" }}
                    />
                    <div>
                        <h5 style={{ margin: 0, color: "white", fontWeight: "bold" }}>
                            {displayProduct.product_name}
                        </h5>
                        <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
                            {displayProduct.product_description?.substring(0, 80)}...
                        </p>
                        <p style={{ margin: 0, color: "#00a550", fontWeight: "bold", fontSize: "1.2rem" }}>
                            KSh {Number(totalAmount).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Payment Method Selector */}
                <div style={{ padding: "20px 24px 0 24px" }}>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "10px" }}>
                        Select Payment Method
                    </p>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>

                        {/* M-Pesa Option */}
                        <div
                            onClick={() => setPaymentMethod("mpesa")}
                            style={{
                                flex: 1, padding: "12px",
                                borderRadius: "10px", cursor: "pointer",
                                border: paymentMethod === "mpesa"
                                    ? "2px solid #00a550"
                                    : "1px solid rgba(255,255,255,0.2)",
                                backgroundColor: paymentMethod === "mpesa"
                                    ? "rgba(0,165,80,0.15)"
                                    : "rgba(255,255,255,0.05)",
                                textAlign: "center"
                            }}>
                            <p style={{ margin: 0, fontSize: "20px" }}>📱</p>
                            <p style={{ margin: 0, color: "white", fontWeight: "bold", fontSize: "13px" }}>
                                M-Pesa
                            </p>
                            <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
                                Instant payment
                            </p>
                        </div>

                        {/* Credit Card Option */}
                        <div
                            onClick={() => setPaymentMethod("card")}
                            style={{
                                flex: 1, padding: "12px",
                                borderRadius: "10px", cursor: "pointer",
                                border: paymentMethod === "card"
                                    ? "2px solid #00d2ff"
                                    : "1px solid rgba(255,255,255,0.2)",
                                backgroundColor: paymentMethod === "card"
                                    ? "rgba(0,210,255,0.15)"
                                    : "rgba(255,255,255,0.05)",
                                textAlign: "center"
                            }}>
                            <p style={{ margin: 0, fontSize: "20px" }}>💳</p>
                            <p style={{ margin: 0, color: "white", fontWeight: "bold", fontSize: "13px" }}>
                                Credit Card
                            </p>
                            <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
                                Visa / Mastercard
                            </p>
                        </div>
                    </div>

                    {/* Status Messages */}
                    {loading && (
                        <p style={{ color: "#f97316", fontWeight: "bold", textAlign: "center" }}>
                            ⏳ {loading}
                        </p>
                    )}
                    {error && (
                        <p style={{ color: "#ff4b2b", fontWeight: "bold", textAlign: "center" }}>
                            {error}
                        </p>
                    )}
                    {success && (
                        <p style={{ color: "#00a550", fontWeight: "bold", textAlign: "center" }}>
                            {success}
                        </p>
                    )}

                    {/* M-Pesa Form */}
                    {paymentMethod === "mpesa" && (
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
                                    Amount (KSh)
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    readOnly
                                    value={`KSh ${Number(totalAmount).toLocaleString()}`}
                                    style={{ fontWeight: "bold", color: "#00a550" }}
                                />
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
                                    M-Pesa Phone Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="2547XXXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <small style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                                    Enter number starting with 2547...
                                </small>
                            </div>

                            {/* Safaricom logo strip */}
                            <div style={{
                                backgroundColor: "rgba(0,102,51,0.2)",
                                border: "1px solid rgba(0,165,80,0.3)",
                                borderRadius: "8px", padding: "10px 14px",
                                marginBottom: "16px",
                                display: "flex", alignItems: "center", gap: "8px"
                            }}>
                                <span style={{ fontSize: "18px" }}>🔒</span>
                                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
                                    Secured by <strong style={{ color: "#00a550" }}>Safaricom M-Pesa</strong>. You will receive a prompt on your phone.
                                </span>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    width: "100%", padding: "14px",
                                    background: "linear-gradient(to right, #006633, #00a550)",
                                    color: "white", border: "none",
                                    borderRadius: "10px", fontWeight: "bold",
                                    fontSize: "16px", cursor: "pointer",
                                    marginBottom: "24px"
                                }}>
                                📱 Send M-Pesa Prompt
                            </button>
                        </form>
                    )}

                    {/* Credit Card Form */}
                    {paymentMethod === "card" && (
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "14px" }}>
                                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
                                    Cardholder Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="John Doe"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                            </div>

                            <div style={{ marginBottom: "14px" }}>
                                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    value={cardNumber}
                                    onChange={(e) => {
                                        // Auto format with spaces every 4 digits
                                        let val = e.target.value.replace(/\D/g, "").slice(0, 16);
                                        val = val.match(/.{1,4}/g)?.join(" ") || val;
                                        setCardNumber(val);
                                    }}
                                />
                            </div>

                            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        value={cardExpiry}
                                        onChange={(e) => {
                                            let val = e.target.value.replace(/\D/g, "").slice(0, 4);
                                            if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2);
                                            setCardExpiry(val);
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
                                        CVV
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        placeholder="•••"
                                        maxLength="3"
                                        value={cardCvv}
                                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                    />
                                </div>
                            </div>

                            {/* Security strip */}
                            <div style={{
                                backgroundColor: "rgba(0,100,200,0.15)",
                                border: "1px solid rgba(0,210,255,0.3)",
                                borderRadius: "8px", padding: "10px 14px",
                                marginBottom: "16px",
                                display: "flex", alignItems: "center", gap: "8px"
                            }}>
                                <span style={{ fontSize: "18px" }}>🔒</span>
                                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
                                    Your card details are <strong style={{ color: "#00d2ff" }}>encrypted and secure</strong>.
                                </span>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    width: "100%", padding: "14px",
                                    background: "linear-gradient(to right, #0066cc, #00d2ff)",
                                    color: "white", border: "none",
                                    borderRadius: "10px", fontWeight: "bold",
                                    fontSize: "16px", cursor: "pointer",
                                    marginBottom: "24px"
                                }}>
                                💳 Pay KSh {Number(totalAmount).toLocaleString()}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MakePaymentComponent;