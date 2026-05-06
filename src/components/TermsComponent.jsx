import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

const TermsComponent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleFinish = () => {
    if (!accepted) {
      alert("Please accept the Terms & Conditions to proceed.");
      return;
    }
    navigate("/makepayment", { state: { ...state } });
  };

  return (
    <div>
      <NavbarComponent />
      <div style={styles.container}>
        <h2 style={styles.title}>📄 Terms & Conditions</h2>
        <p style={styles.subtitle}>Please read and accept before proceeding to payment.</p>

        {/* Terms Box */}
        <div style={styles.termsBox}>
          <h4>1. Booking Policy</h4>
          <p>All bookings are subject to availability. A confirmation will be sent upon successful payment.</p>

          <h4>2. Payment</h4>
          <p>Full payment is required to confirm your booking. Payments are processed securely via M-Pesa.</p>

          <h4>3. Cancellation Policy</h4>
          <p>Cancellations made 7+ days before departure receive a 50% refund. No refund for cancellations under 7 days.</p>

          <h4>4. Travel Documents</h4>
          <p>You are responsible for ensuring your passport, visa, and travel documents are valid for your destination.</p>

          <h4>5. Orient Travellers Liability</h4>
          <p>Orient Travellers is not liable for delays, cancellations, or issues caused by third-party providers (airlines, hotels).</p>

          <h4>6. Health & Safety</h4>
          <p>You agree to follow all health and safety guidelines provided by Orient Travellers during your trip.</p>
        </div>

        {/* Checkbox */}
        <div style={styles.checkRow}>
          <input
            type="checkbox"
            id="terms"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
            style={styles.checkbox}
          />
          <label htmlFor="terms" style={styles.checkLabel}>
            I have read and agree to the Terms & Conditions
          </label>
        </div>

        {/* Buttons */}
        <div style={styles.btnRow}>
          <button
            style={styles.prevBtn}
            onClick={() => navigate(-1)}
          >
            ← Previous
          </button>

          <button
            style={styles.cancelBtn}
            onClick={() => navigate("/")}
          >
            ✕ Cancel
          </button>

          <button
            style={accepted ? styles.finishBtn : styles.finishBtnDisabled}
            onClick={handleFinish}
          >
            Finish & Pay →
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "600px", margin: "40px auto", padding: "0 20px" },
  title: { fontSize: "24px", fontWeight: "bold", color: "#1e3a5f" },
  subtitle: { color: "#666", marginBottom: "20px" },
  termsBox: {
    backgroundColor: "#f8faff", border: "1px solid #dde",
    borderRadius: "10px", padding: "20px", height: "300px",
    overflowY: "scroll", fontSize: "13px",
    lineHeight: "1.7", color: "#333", marginBottom: "20px"
  },
  checkRow: {
    display: "flex", alignItems: "center",
    gap: "10px", marginBottom: "24px"
  },
  checkbox: { width: "18px", height: "18px", cursor: "pointer" },
  checkLabel: { fontSize: "14px", fontWeight: "600", color: "#1e3a5f", cursor: "pointer" },
  btnRow: { display: "flex", gap: "10px", marginBottom: "40px" },
  prevBtn: {
    flex: 1, padding: "12px", backgroundColor: "#1e3a5f",
    color: "white", border: "none", borderRadius: "8px",
    fontSize: "14px", fontWeight: "bold", cursor: "pointer"
  },
  cancelBtn: {
    flex: 1, padding: "12px", backgroundColor: "#ef4444",
    color: "white", border: "none", borderRadius: "8px",
    fontSize: "14px", fontWeight: "bold", cursor: "pointer"
  },
  finishBtn: {
    flex: 1, padding: "12px", backgroundColor: "#f97316",
    color: "white", border: "none", borderRadius: "8px",
    fontSize: "14px", fontWeight: "bold", cursor: "pointer"
  },
  finishBtnDisabled: {
    flex: 1, padding: "12px", backgroundColor: "#ccc",
    color: "white", border: "none", borderRadius: "8px",
    fontSize: "14px", fontWeight: "bold", cursor: "not-allowed"
  }
};

export default TermsComponent;