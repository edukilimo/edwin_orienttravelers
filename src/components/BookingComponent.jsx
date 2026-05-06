import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import NavbarComponent from "./NavbarComponent";

const BookingComponent = () => {

const { state } = useLocation();
const navigate = useNavigate();

const product = state?.product;
const cart = state?.cart;

// 👉 this decides what to use everywhere else
const activeProduct = product || (cart && cart[0]);

  // These match what admin can tick in AddProduct
  // If admin ticked it = true = it's COVERED, user cannot change it
  // If admin did NOT tick = false = user must choose their own option

 const covered = {
  transport: activeProduct?.transport_covered || false,
  hotel: activeProduct?.hotel_covered || false,
  food: activeProduct?.food_covered || false,
  insurance: activeProduct?.insurance_covered || false,
  activities: activeProduct?.activities_covered || false,
};

  const [selections, setSelections] = useState({
    transport: "",
    hotel: "",
    food: "",
    insurance: "",
    activities: "",
    travelers: 1,
    specialRequests: "",
  });

  const handleChange = (field, value) => {
    setSelections(prev => ({ ...prev, [field]: value }));
  };

  const [toast, setToast] = useState("");

const handleNext = () => {
  const showToastAndScroll = (message, fieldId) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000); // toast disappears after 3 seconds

    const element = document.getElementById(fieldId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.style.border = "2px solid #ef4444"; // red border on empty field
      setTimeout(() => {
        element.style.border = "1px solid #ddd"; // reset border after 3 seconds
      }, 3000);
    } else {
      // If no specific field, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!covered.transport && !selections.transport) {
    showToastAndScroll("Please select a Transport option.", "transport-select");
    return;
  }

  if (!covered.hotel && !selections.hotel) {
    showToastAndScroll("Please select an Accommodation option.", "hotel-select");
    return;
  }

  if (!covered.food && !selections.food) {
    showToastAndScroll("Please select a Meal Plan option.", "food-select");
    return;
  }

  if (!covered.activities && !selections.activities) {
    showToastAndScroll("Please select an Activities option.", "activities-select");
    return;
  }

  if (!covered.insurance && !selections.insurance) {
    showToastAndScroll("Please select a Travel Insurance option.", "insurance-select");
    return;
  }

  navigate("/terms", {
  state: {
    product: activeProduct,
    cart,
    selections,
    covered
  }
});
};


  return (
    <div>
      {/* <NavbarComponent /> */}
      {toast && (
  <div style={{
    position: "fixed", top: "20px", left: "50%",
    transform: "translateX(-50%)", backgroundColor: "#ef4444",
    color: "white", padding: "12px 24px", borderRadius: "8px",
    fontWeight: "600", fontSize: "14px", zIndex: 9999,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease"
  }}>
    ⚠️ {toast}
  </div>
)}
      <div style={styles.container}>
        <h2 style={styles.title}>🧳 Customize Your Booking</h2>
        <p style={styles.subtitle}>
        Trip: <strong>{activeProduct?.product_name}</strong>
        </p>

        {cart && cart.length > 0 && (
  <div style={{ marginBottom: "20px" }}>
    <h4>🛒 Selected Trips</h4>
    {cart.map(item => (
      <div key={item.id} style={{
        background: "#fff",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "8px",
        border: "1px solid #ddd"
      }}>
        <strong>{item.product_name}</strong> × {item.quantity}
      </div>
    ))}
  </div>
)}

        {/* Number of Travelers - always shown */}
        <div style={styles.card}>
          <label style={styles.label}>👥 Number of Travelers</label>
          <input
            type="number"
            min="1"
            value={selections.travelers}
            onChange={e => handleChange("travelers", e.target.value)}
            style={styles.input}
          />

        </div>

        {/* TRANSPORT */}
        <div style={styles.card}>
          <label style={styles.label}>✈️ Transport</label>
          {covered.transport ? (
            <p style={styles.coveredText}>✅ Covered by Orient Travellers</p>
          ) : (
            <select  id="transport-select" style={styles.input} onChange={e => handleChange("transport", e.target.value)}>
              <option value="">-- Select Transport --</option>
              <option value="flight">Flight</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="self_drive">Self Drive</option>
              <option value="private_transfer">Private Transfer</option>
            </select>
          )}
        </div>

        {/* HOTEL */}
        <div style={styles.card}>
          <label style={styles.label}>🏨 Hotel / Accommodation</label>
          {covered.hotel ? (
            <p style={styles.coveredText}>✅ Covered by Orient Travellers</p>
          ) : (
            <select id="hotel-select" style={styles.input} onChange={e => handleChange("hotel", e.target.value)}>
              <option value="">-- Select Accommodation --</option>
              <option value="budget">Budget (1-2 Star)</option>
              <option value="standard">Standard (3 Star)</option>
              <option value="luxury">Luxury (4-5 Star)</option>
              <option value="airbnb">Airbnb / Self Catering</option>
              <option value="camping">Camping</option>
            </select>
          )}
        </div>

        {/* FOOD */}
        <div style={styles.card}>
          <label style={styles.label}>🍽️ Meals</label>
          {covered.food ? (
            <p style={styles.coveredText}>✅ Covered by Orient Travellers</p>
          ) : (
            <select id="food-select" style={styles.input} onChange={e => handleChange("food", e.target.value)}>
              <option value="">-- Select Meal Plan --</option>
              <option value="none">No Meals (Own Arrangement)</option>
              <option value="breakfast">Breakfast Only</option>
              <option value="half_board">Half Board (B&D)</option>
              <option value="full_board">Full Board (B, L & D)</option>
              <option value="all_inclusive">All Inclusive</option>
            </select>
          )}
        </div>

        {/* ACTIVITIES */}
        <div style={styles.card}>
          <label style={styles.label}>🎯 Activities</label>
          {covered.activities ? (
            <p style={styles.coveredText}>✅ Covered by Orient Travellers</p>
          ) : (
            <select id="activities-select" style={styles.input} onChange={e => handleChange("activities", e.target.value)}>
              <option value="">-- Select Activities --</option>
              <option value="none">None</option>
              <option value="guided_tour">Guided Tour</option>
              <option value="safari">Safari</option>
              <option value="hiking">Hiking / Trekking</option>
              <option value="water_sports">Water Sports</option>
              <option value="cultural">Cultural Experiences</option>
            </select>
          )}
        </div>

        {/* TRAVEL INSURANCE */}
        <div style={styles.card}>
          <label style={styles.label}>🛡️ Travel Insurance</label>
          {covered.insurance ? (
            <p style={styles.coveredText}>✅ Covered by Orient Travellers</p>
          ) : (
            <select id="insurance-select" style={styles.input} onChange={e => handleChange("insurance", e.target.value)}>
              <option value="">-- Select Insurance --</option>
              <option value="none">No Insurance</option>
              <option value="basic">Basic Cover</option>
              <option value="comprehensive">Comprehensive Cover</option>
            </select>
          )}
        </div>

        {/* SPECIAL REQUESTS */}
        <div style={styles.card}>
          <label style={styles.label}>📝 Special Requests (Optional)</label>
          <textarea
            style={{ ...styles.input, height: "80px", resize: "none" }}
            placeholder="Any dietary needs, accessibility requirements, special occasions..."
            onChange={e => handleChange("specialRequests", e.target.value)}
          />
        </div>

        {/* NEXT BUTTON */}
        <button style={styles.nextBtn} onClick={handleNext}>
          Next → Review & Accept Terms
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "600px", margin: "40px auto", padding: "0 20px" },
  title: { fontSize: "24px", fontWeight: "bold", color: "#1e3a5f" },
  subtitle: { color: "#666", marginBottom: "24px" },
  card: {
    backgroundColor: "#fff", border: "1px solid #e2e8f0",
    borderRadius: "10px", padding: "16px", marginBottom: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },
  label: { display: "block", fontWeight: "600", marginBottom: "8px", color: "#1e3a5f" },
  input: {
    width: "100%", padding: "10px", borderRadius: "8px",
    border: "1px solid #ddd", fontSize: "14px",
    boxSizing: "border-box", outline: "none"
  },
  coveredText: { color: "#16a34a", fontWeight: "600", margin: 0 },
  nextBtn: {
    width: "100%", padding: "14px", backgroundColor: "#f97316",
    color: "white", border: "none", borderRadius: "10px",
    fontSize: "16px", fontWeight: "bold", cursor: "pointer",
    marginTop: "8px", marginBottom: "40px"
  }
};

export default BookingComponent;