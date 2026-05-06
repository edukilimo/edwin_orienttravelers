import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetProductComponent = () => {

    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [luxury, setLuxury] = useState([]);
    let [adventure, setAdventure] = useState([]);
    let [honeymoon, setHoneymoon] = useState([]);
    let [culture, setculture] = useState([]);
    let [search_word, setSearchWord] = useState("");
    let [filtered_products, setFilteredProducts] = useState([]);
    let [search_history, setSearchHistory] = useState(
        JSON.parse(localStorage.getItem("search_history")) || []
    );
    let [show_history, setShowHistory] = useState(false);
    let [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    let [toast, setToast] = useState("");
    let [cart_open, setCartOpen] = useState(false);

    let navigator = useNavigate();
    const img_url = "https://edwink.alwaysdata.net/static/images/";

    const getProducts = async () => {
        setError("");
        setLoading("Fetching products, please wait...");
        try {
            const response = await axios.get("https://edwink.alwaysdata.net/api/get_products");
            if (response.status === 200) {
                setLoading("");
                setProducts(response.data);
                setLuxury(response.data.filter(p => p.product_category === "luxury"));
                setAdventure(response.data.filter(p => p.product_category === "adventure"));
                setHoneymoon(response.data.filter(p => p.product_category === "honeymoon"));
                setculture(response.data.filter(p => p.product_category === "culture"));
            }
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    useEffect(() => { getProducts(); }, []);

    const handleSearch = (word) => {
        if (!word.trim()) {
            setFilteredProducts([]);
            return;
        }
        const updated_history = [
            word,
            ...search_history.filter(h => h.toLowerCase() !== word.toLowerCase())
        ].slice(0, 5);
        setSearchHistory(updated_history);
        localStorage.setItem("search_history", JSON.stringify(updated_history));

        let filtered = products.filter(p =>
            p.product_name.toLowerCase().includes(word.toLowerCase()) ||
            p.product_description.toLowerCase().includes(word.toLowerCase()) ||
            p.product_category.toLowerCase().includes(word.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    useEffect(() => { handleSearch(search_word); }, [search_word, products]);

    const addToCart = (product) => {
        let existing = cart.find(item => item.id === product.id);
        let updatedCart;

        if (existing) {
            updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Toast message encourages selecting more trips
        setToast(`✅ ${product.product_name} added! Keep exploring for more trips 🌍`);
        setTimeout(() => setToast(""), 3000);

        // Open cart drawer automatically
        setCartOpen(true);
    };

    const removeFromCart = (id) => {
        let updated = cart.filter(item => item.id !== id);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const increaseQty = (id) => {
        let updated = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const decreaseQty = (id) => {
        let updated = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.product_cost * item.quantity, 0);

    // REUSABLE PRODUCT CARD
    // Before, we had the same card code copied 5 times (once for luxury, adventure,
    // honeymoon, culture and search results). That made the file long and hard to manage.
    // Now we have ONE card component that we can use everywhere.
    // We just pass in the "product" data and it displays it correctly each time.
    const ProductCard = ({ product }) => (
        <div className="col-md-3 mb-4">
            <div className="travel-card">
                <img src={img_url + product.product_image} alt={product.product_name} />
                <div className="card-body mt-2">
                    <h5>{product.product_name}</h5>
                    <p style={{ fontSize: "14px", opacity: 0.85 }}>{product.product_description}</p>
                    <p style={{ color: "#ff8c00", fontWeight: "bold", fontSize: "1.2rem" }}>
                        KSh {Number(product.product_cost).toLocaleString()}
                    </p>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-success w-100"
                            onClick={() => navigator("/booking", { state: { product } })}>
                            Book Now 🌍
                        </button>
                        <button
                            className="btn btn-outline-warning w-100"
                            onClick={() => addToCart(product)}>
                            🛒 Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const CategorySection = ({ title, products, colorClass }) => (
        <>
            <div className="col-12 my-4">
                <span className={`category-title ${colorClass}`}>{title}</span>
            </div>
            <div className="row">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );

    return (
        <div>

            {/* Toast notification — green bar at top, no popup */}
            {toast && (
                <div style={{
                    position: "fixed", top: "80px", left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#16a34a", color: "white",
                    padding: "12px 24px", borderRadius: "8px",
                    fontWeight: "600", fontSize: "14px",
                    zIndex: 9999, boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}>
                    {toast}
                </div>
            )}

            {/* Cart Drawer — fixed top right, does NOT cover products */}
            {cart_open && (
                <div style={{
                    position: "fixed", top: "70px", right: "20px",
                    width: "360px", maxHeight: "80vh",
                    backgroundColor: "#0a2540",
                    borderRadius: "16px",
                    border: "1px solid rgba(0,210,255,0.2)",
                    zIndex: 9998, overflowY: "auto",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    display: "flex", flexDirection: "column"
                }}>

                    {/* Drawer Header */}
                    <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", padding: "16px 20px",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        backgroundColor: "#051e3e",
                        borderRadius: "16px 16px 0 0"
                    }}>
                        <h5 style={{ margin: 0, color: "white" }}>
                            🛒 My Cart ({cartCount})
                        </h5>
                        <button
                            onClick={() => setCartOpen(false)}
                            style={{
                                background: "none", border: "none",
                                color: "white", fontSize: "20px", cursor: "pointer"
                            }}>✕</button>
                    </div>

                    {/* Empty cart message with Start Selection button */}
                    {cart.length === 0 && (
                        <div style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.6)" }}>
                            <p style={{ fontSize: "48px", margin: 0 }}>🛒</p>
                            <p style={{ color: "white", fontWeight: "bold", marginTop: "12px" }}>
                                No package selected
                            </p>
                            <p style={{ fontSize: "13px" }}>
                                Browse our amazing trips below!
                            </p>
                            {/* Closes cart and returns user to packages */}
                            <button
                                onClick={() => setCartOpen(false)}
                                style={{
                                    marginTop: "12px",
                                    backgroundColor: "#f97316",
                                    color: "white", border: "none",
                                    borderRadius: "8px", padding: "10px 20px",
                                    fontWeight: "bold", cursor: "pointer",
                                    fontSize: "14px"
                                }}>
                                Start Selection 🌍
                            </button>
                        </div>
                    )}

                    {/* Cart Items */}
                    <div style={{ flex: 1, padding: "12px" }}>
                        {cart.map(item => (
                            <div key={item.id} style={{
                                backgroundColor: "rgba(255,255,255,0.06)",
                                borderRadius: "10px", padding: "12px",
                                marginBottom: "10px",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                    <img
                                        src={img_url + item.product_image}
                                        alt={item.product_name}
                                        style={{ width: "70px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontWeight: "bold", fontSize: "13px", color: "white" }}>
                                            {item.product_name}
                                        </p>
                                        <p style={{ margin: "4px 0", color: "#ff8c00", fontSize: "13px" }}>
                                            KSh {Number(item.product_cost).toLocaleString()}
                                        </p>

                                        {/* Quantity controls */}
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                                            <button
                                                onClick={() => decreaseQty(item.id)}
                                                style={{
                                                    width: "28px", height: "28px", borderRadius: "50%",
                                                    border: "1px solid rgba(255,255,255,0.3)",
                                                    background: "none", color: "white",
                                                    cursor: "pointer", fontSize: "16px"
                                                }}>−</button>
                                            <span style={{ color: "white", fontWeight: "bold" }}>{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQty(item.id)}
                                                style={{
                                                    width: "28px", height: "28px", borderRadius: "50%",
                                                    border: "1px solid rgba(255,255,255,0.3)",
                                                    background: "none", color: "white",
                                                    cursor: "pointer", fontSize: "16px"
                                                }}>+</button>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                style={{
                                                    marginLeft: "auto", background: "none",
                                                    border: "none", color: "#ff4b2b",
                                                    cursor: "pointer", fontSize: "13px"
                                                }}>🗑 Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Footer — Total + Checkout */}
                    {cart.length > 0 && (
                        <div style={{
                            padding: "16px 20px",
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                            backgroundColor: "#051e3e",
                            borderRadius: "0 0 16px 16px"
                        }}>
                            {/* Total trips selected */}
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: "0 0 6px 0" }}>
                                {cart.length} trip{cart.length > 1 ? "s" : ""} selected
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                                <span style={{ color: "white", fontWeight: "bold" }}>Total:</span>
                                <span style={{ color: "#ff8c00", fontWeight: "bold", fontSize: "1.1rem" }}>
                                    KSh {cartTotal.toLocaleString()}
                                </span>
                            </div>
                            {/* Add more trips button */}
                            <button
                                onClick={() => setCartOpen(false)}
                                style={{
                                    width: "100%", padding: "8px",
                                    backgroundColor: "transparent",
                                    color: "#00d2ff", border: "1px solid #00d2ff",
                                    borderRadius: "8px", cursor: "pointer",
                                    fontWeight: "bold", fontSize: "13px",
                                    marginBottom: "8px"
                                }}>
                                + Add More Trips
                            </button>
                            <button
                                className="btn btn-success w-100"
                                onClick={() => {
                                    setCartOpen(false);
                                    navigator("/booking", { state: { cart } });
                                }}>
                                Proceed to Booking →
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Dark overlay — click it to close cart */}
            {cart_open && (
                <div
                    onClick={() => setCartOpen(false)}
                    style={{
                        position: "fixed", top: 0, left: 0,
                        width: "100vw", height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        zIndex: 9997
                    }}
                />
            )}

            <div className="container-fluid px-4">

                {/* Page Title + Cart Icon */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="mt-3 mb-2">
                    <h3 className="text-white mb-0 text-center">Available Packages</h3>

                    {/* Cart button with red badge */}
                    <button
                        onClick={() => setCartOpen(true)}
                        style={{
                            position: "relative", background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)", borderRadius: "10px",
                            padding: "8px 16px", color: "white", cursor: "pointer",
                            fontSize: "20px"
                        }}>
                        🛒
                        {cartCount > 0 && (
                            <span style={{
                                position: "absolute", top: "-8px", right: "-8px",
                                backgroundColor: "#ff4b2b", color: "white",
                                borderRadius: "50%", width: "22px", height: "22px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "11px", fontWeight: "bold"
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                <h6 className="text-warning text-center">{loading}</h6>
                <h6 className="text-danger text-center">{error}</h6>

                {/* Search Bar */}
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8 col-lg-6" style={{ position: "relative" }}>
                        <div className="input-group shadow-sm">
                            <input
                                type="text"
                                placeholder="Where would you like to escape to today?"
                                className="form-control py-3"
                                value={search_word}
                                onChange={(e) => {
                                    setSearchWord(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                                onFocus={() => setShowHistory(true)}
                                onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                            />
                            <button
                                className="btn btn-warning fw-bold"
                                type="button"
                                onClick={() => handleSearch(search_word)}>
                                Search
                            </button>
                        </div>

                        {/* Search History Dropdown */}
                        {show_history && search_history.length > 0 && !search_word && (
                            <div style={{
                                position: "absolute", top: "100%", left: 0, right: 0,
                                backgroundColor: "rgba(8, 30, 63, 0.97)",
                                border: "1px solid rgba(0, 210, 255, 0.3)",
                                borderRadius: "0 0 12px 12px", zIndex: 1000, overflow: "hidden"
                            }}>
                                <div style={{
                                    display: "flex", justifyContent: "space-between",
                                    alignItems: "center", padding: "8px 16px",
                                    borderBottom: "1px solid rgba(255,255,255,0.1)"
                                }}>
                                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                                        🕐 Recent Searches
                                    </span>
                                    <span
                                        onClick={() => {
                                            setSearchHistory([]);
                                            localStorage.removeItem("search_history");
                                        }}
                                        style={{ fontSize: "12px", color: "#ff4b2b", cursor: "pointer" }}>
                                        Clear All
                                    </span>
                                </div>
                                {search_history.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSearchWord(item);
                                            handleSearch(item);
                                            setShowHistory(false);
                                        }}
                                        style={{
                                            display: "flex", justifyContent: "space-between",
                                            alignItems: "center", padding: "10px 16px",
                                            cursor: "pointer",
                                            borderBottom: "1px solid rgba(255,255,255,0.05)"
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = "rgba(0,210,255,0.1)"}
                                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                    >
                                        <span style={{ color: "white", fontSize: "14px" }}>🔍 {item}</span>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const updated = search_history.filter((_, i) => i !== index);
                                                setSearchHistory(updated);
                                                localStorage.setItem("search_history", JSON.stringify(updated));
                                            }}
                                            style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer" }}>
                                            ✕
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Results */}
                {search_word && filtered_products.length > 0 && (
                    <>
                        <div className="col-12 my-4">
                            <span className="category-title" style={{ background: "rgba(255,255,255,0.2)" }}>
                                🔍 Search Results for "{search_word}"
                            </span>
                        </div>
                        <div className="row">
                            {filtered_products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                )}

                {/* No results */}
                {search_word && filtered_products.length === 0 && (
                    <p className="text-center text-white mt-3">
                        😔 No packages found for "<b>{search_word}</b>". Try "luxury", "adventure", "honeymoon" or "culture".
                    </p>
                )}

                {/* Categories */}
                {!search_word && (
                    <>
                        <CategorySection title="✨ Luxury" products={luxury} colorClass="luxury" />
                        <CategorySection title="🏔️ Adventure" products={adventure} colorClass="adventure" />
                        <CategorySection title="💍 Honeymoon" products={honeymoon} colorClass="honeymoon" />
                        <CategorySection title="🎭 Culture" products={culture} colorClass="culture" />
                    </>
                )}
            </div>
        </div>
    );
};

export default GetProductComponent;