import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
    let [cart, setCart] = useState([]);
    let navigator = useNavigate();

    useEffect(() => {
        let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const removeItem = (id) => {
        let updated = cart.filter(item => item.id !== id);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const total = cart.reduce((sum, item) => sum + item.product_cost * item.quantity, 0);

    return (
        <div className="container mt-4 text-white">
            <h3>Your Cart 🛒</h3>

            {cart.length === 0 && <p>No trips selected yet.</p>}

            {cart.map(item => (
                <div key={item.id} className="border p-3 mb-3">
                    <h5>{item.product_name}</h5>
                    <p>Price: KSh {item.product_cost}</p>
                    <p>Qty: {item.quantity}</p>

                    <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item.id)}>
                        Remove
                    </button>
                </div>
            ))}

            {cart.length > 0 && (
                <>
                    <h4>Total: KSh {total.toLocaleString()}</h4>

                    <button
                        className="btn btn-success mt-3"
                        onClick={() => navigator("/booking", { state: { cart } })}>
                        Proceed to Booking
                    </button>
                </>
            )}
        </div>
    );
};

export default CartComponent;