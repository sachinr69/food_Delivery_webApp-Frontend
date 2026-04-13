import { useApp } from "../context/AppContext";
import Icons from "./Icons";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { page, setPage, cartTotal, setCartOpen, user, setUser } = useApp();

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>

        {/* ── Logo ── */}
        <div className={styles.logo} onClick={() => setPage("home")}>
          <span>🍔</span>
          Food<span className={styles.dot}>Dash</span>
        </div>

        {/* ── Nav Links (desktop) ── */}
        <div className={styles.links}>
          {["home", "menu", "orders", "about"].map((p) => (
            <button
              key={p}
              className={`${styles.link} ${page === p ? styles.active : ""}`}
              onClick={() => setPage(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Right Actions ── */}
        <div className={styles.actions}>
          {user ? (
            <>
              <span className={styles.greeting}>👋 {user.name}</span>
              <button
                className="btn-icon"
                title="Sign out"
                onClick={() => { setUser(null); setPage("home"); }}
              >
                <Icons.LogOut />
              </button>
            </>
          ) : (
            <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setPage("login")}>
              <Icons.User /> Sign In
            </button>
          )}

          <button className={styles.cartBtn} onClick={() => setCartOpen(true)}>
            <Icons.Cart />
            Cart
            {cartTotal > 0 && (
              <span className={styles.cartCount}>{cartTotal > 99 ? "99+" : cartTotal}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
