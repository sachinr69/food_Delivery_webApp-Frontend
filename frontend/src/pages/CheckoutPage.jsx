import { useState } from "react";
import { useApp } from "../context/AppContext";
import { API_BASE } from "../data/constants";
import styles from "./CheckoutPage.module.css";

const PAYMENT_OPTS = [
  { id: "card",   icon: "💳", label: "Credit / Debit Card" },
  { id: "upi",    icon: "📱", label: "UPI / PhonePe"       },
  { id: "cod",    icon: "💵", label: "Cash on Delivery"    },
  { id: "wallet", icon: "👛", label: "FoodDash Wallet"     },
];

export default function CheckoutPage() {
  const { cart, dispatch, cartSubtotal, addToast, setPage, user } = useApp();

  const [form, setForm]       = useState({ name: user?.name || "", phone: "", address: "", city: "", pincode: "" });
  const [payment, setPayment] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors]   = useState({});

  const delivery = 40;
  const gst      = Math.round(cartSubtotal * 0.05);
  const total    = cartSubtotal + delivery + gst;

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required";
    if (!form.phone.trim())   e.phone   = "Phone number is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim())    e.city    = "City is required";
    if (!form.pincode.trim()) e.pincode = "Pincode is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  /* ── Place order ── */
  const handleOrder = async () => {
    if (!validate()) return;
    setPlacing(true);
    try {
      // ── Uncomment when backend is ready ──────────────────────────────────
      // const token = localStorage.getItem("token");
      // const res = await fetch(`${API_BASE}/orders`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      //   body: JSON.stringify({ items: cart, address: form, payment, total }),
      // });
      // if (!res.ok) throw new Error("Order failed");
      // ─────────────────────────────────────────────────────────────────────

      await new Promise((r) => setTimeout(r, 1800)); // Simulated delay
      dispatch({ type: "CLEAR" });
      addToast("Order placed successfully! 🎉", "success");
      setPage("orders");
    } catch {
      addToast("Failed to place order. Please try again.", "error");
    } finally {
      setPlacing(false);
    }
  };

  /* ── Empty cart ── */
  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some food before checking out.</p>
        <button className="btn btn-primary" onClick={() => setPage("menu")}>Browse Menu</button>
      </div>
    );
  }

  /* ── Field helper ── */
  const Field = ({ k, label, placeholder, type = "text", half = false }) => (
    <div className="form-group" style={half ? { marginBottom: 0 } : {}}>
      <label className="form-label">{label}</label>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={form[k]}
        onChange={set(k)}
      />
      {errors[k] && <p className="form-error">{errors[k]}</p>}
    </div>
  );

  return (
    <div className="page">
      <div className={styles.pageHeader}>
        <span className="badge" style={{ marginBottom: 14 }}>Checkout</span>
        <h1 className={styles.title}>Complete Your Order</h1>
      </div>

      <div className={styles.grid}>

        {/* ── Left column ── */}
        <div className={styles.left}>

          {/* Delivery */}
          <div className={`card ${styles.section}`}>
            <h3 className={styles.sectionTitle}>📍 Delivery Details</h3>
            <div className="form-row">
              <Field k="name"  label="Full Name *"     placeholder="Arjun Singh" half />
              <Field k="phone" label="Phone Number *"  placeholder="+91 98765 43210" type="tel" half />
            </div>
            <Field k="address" label="Street Address *" placeholder="Flat 12B, Sunshine Apts, MG Road..." />
            <div className="form-row">
              <Field k="city"    label="City *"    placeholder="Dehradun"  half />
              <Field k="pincode" label="Pincode *" placeholder="248001" type="number" half />
            </div>
          </div>

          {/* Payment */}
          <div className={`card ${styles.section}`} style={{ marginTop: 20 }}>
            <h3 className={styles.sectionTitle}>💳 Payment Method</h3>

            <div className={styles.payGrid}>
              {PAYMENT_OPTS.map((p) => (
                <div
                  key={p.id}
                  className={`${styles.payOpt} ${payment === p.id ? styles.paySelected : ""}`}
                  onClick={() => setPayment(p.id)}
                >
                  <span className={styles.payIcon}>{p.icon}</span>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>

            {payment === "card" && (
              <div style={{ marginTop: 4 }}>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input className="input" placeholder="4242 4242 4242 4242" maxLength={19} />
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Expiry</label>
                    <input className="input" placeholder="MM / YY" maxLength={7} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">CVV</label>
                    <input className="input" placeholder="•••" type="password" maxLength={4} />
                  </div>
                </div>
              </div>
            )}

            {payment === "upi" && (
              <div className="form-group" style={{ marginTop: 14 }}>
                <label className="form-label">UPI ID</label>
                <input className="input" placeholder="yourname@upi" />
              </div>
            )}
          </div>
        </div>

        {/* ── Right column: summary ── */}
        <div className={styles.right}>
          <div className={`card ${styles.summaryCard}`}>
            <h3 className={styles.sectionTitle}>🧾 Order Summary</h3>

            <div className={styles.summaryItems}>
              {cart.map((item) => (
                <div className={styles.summaryItem} key={item._id}>
                  <span className={styles.summaryLeft}>
                    <span className={styles.summaryEmoji}>{item.emoji}</span>
                    <span>{item.name} × {item.qty}</span>
                  </span>
                  <span className={styles.summaryPrice}>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className={styles.rows}>
              <div className={styles.row}><span>Subtotal</span><span>₹{cartSubtotal}</span></div>
              <div className={styles.row}><span>Delivery</span><span>₹{delivery}</span></div>
              <div className={styles.row}><span>GST (5%)</span><span>₹{gst}</span></div>
            </div>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalVal}>₹{total}</span>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", padding: "15px", fontSize: 15, marginTop: 20 }}
              onClick={handleOrder}
              disabled={placing}
            >
              {placing ? "Placing Order..." : `Place Order · ₹${total}`}
            </button>

            <p className={styles.secure}>🔒 Secured by Razorpay / Stripe</p>
          </div>
        </div>

      </div>
    </div>
  );
}
