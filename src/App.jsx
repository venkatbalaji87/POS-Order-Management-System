import React, { useEffect, useState } from "react";
import { OfflineDataStore } from "./data/store";
import { PrintJobManager } from "./data/print";
import { SyncEngine } from "./data/sync";
import { Realtime } from "./data/realtime";
import { usePersistentCart } from "./hooks/usePersistentCart";
import Catalog from "./components/Catalog";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Modal from "./components/Modal"; // new

const store = new OfflineDataStore();
const printMgr = new PrintJobManager(store);
const sync = new SyncEngine(store);
const realtime = new Realtime();

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, updateCart] = usePersistentCart(store);
  const [modal, setModal] = useState({ open: false, title: "", message: "" });

  // Load or seed products
  useEffect(() => {
    (async () => {
      const items = await store.getAll("products");
      if (items.length === 0) {
        const seedNames = [
          "Cheeseburger", "Veggie Burger", "Chicken Wrap",
          "Paneer Tikka Roll", "French Fries", "Loaded Nachos",
          "Hot Dog", "Grilled Sandwich", "Taco", "Quesadilla",
          "Chocolate Milkshake", "Cold Coffee", "Mango Smoothie",
          "Lemon Iced Tea", "Soft Drink Can", "Water Bottle",
          "Cupcake", "Brownie", "Ice Cream Sundae", "Churros"
        ];

        const seed = seedNames.map((name, i) => ({
          id: `p-${i}`,
          name,
          price: Math.round(Math.random() * 200) + 50,
        }));

        await Promise.all(seed.map((p) => store.put("products", p)));
        setProducts(seed);
      } else {
        setProducts(items);
      }
    })();
  }, []);

  // Realtime order notification
  useEffect(() => {
    realtime.onMessage((msg) => {
      if (msg.event === "orderPlaced") {
        setModal({
          open: true,
          title: "New Order",
          message: `🔔 New order placed: ${msg.payload.id}`,
        });
      }
    });
  }, []);

  const addToCart = (p) => {
    updateCart((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) {
        return prev.map((i) =>
          i.id === p.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    updateCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const placeOrder = async () => {
    if (!cart.length) {
      setModal({ open: true, title: "Error", message: "Cart is empty!" });
      return;
    }

    const order = {
      id: crypto.randomUUID(),
      items: cart,
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      status: "pending",
    };
    await store.put("orders", order);

    await printMgr.enqueue({
      destination: "receipt",
      template: "receipt",
      payload: order,
    });
    await printMgr.enqueue({
      destination: "kitchen",
      template: "kitchen",
      payload: order,
    });

    updateCart([]); 
    realtime.broadcast("orderPlaced", order);
    setModal({ open: true, title: "Success", message: "✅ Order placed (offline-safe)!" });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header onSync={() => sync.sync()} />
      <div className="layout">
        <Catalog
          products={filteredProducts}
          onAdd={addToCart}
          onSearch={setSearch}
          search={search}
        />
        <Cart
          items={cart}
          onPlaceOrder={placeOrder}
          onUpdateQty={updateQty}
        />
      </div>

      {/* Modal */}
      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal({ ...modal, open: false })}
      />
    </>
  );
}
