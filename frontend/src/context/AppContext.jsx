import { createContext, useContext, useReducer, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CART REDUCER
// ─────────────────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const idx = state.findIndex((i) => i._id === action.item._id);
      if (idx > -1) {
        return state.map((i, x) => (x === idx ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "INC":
      return state.map((i) => (i._id === action.id ? { ...i, qty: i.qty + 1 } : i));
    case "DEC":
      return state
        .map((i) => (i._id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "REMOVE":
      return state.filter((i) => i._id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, dispatch]      = useReducer(cartReducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [page, setPage]       = useState("home");
  const [user, setUser]       = useState(null);
  const [toasts, setToasts]   = useState([]);

  // ── Toast ────────────────────────────────────────────────────────────────
  const addToast = useCallback((msg, type = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  // ── Add to cart ──────────────────────────────────────────────────────────
  const addToCart = useCallback(
    (item) => {
      dispatch({ type: "ADD", item });
      addToast(`${item.name} added to cart 🛒`, "success");
    },
    [addToast]
  );

  // ── Derived values ────────────────────────────────────────────────────────
  const cartTotal    = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider
      value={{
        // cart
        cart, dispatch, addToCart,
        cartOpen, setCartOpen,
        cartTotal, cartSubtotal,
        // navigation
        page, setPage,
        // auth
        user, setUser,
        // toasts
        toasts, addToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — use anywhere in the app
// ─────────────────────────────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
